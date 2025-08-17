use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::time;
use ic_cdk::{init, post_upgrade, pre_upgrade, query, update};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::Serialize;
use sha2::{Digest, Sha256};
use std::borrow::Cow;
use std::cell::RefCell;
use std::collections::HashMap;

type Memory = VirtualMemory<DefaultMemoryImpl>;

// User Role enumeration
#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq)]
pub enum UserRole {
    Admin,
    Investor,
    Business,
    Guest,
}

// User Profile structure
#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct UserProfile {
    pub principal: Principal,
    pub role: UserRole,
    pub display_name: Option<String>,
    pub email: Option<String>,
    pub created_at: u64,
    pub updated_at: u64,
}

impl Storable for UserProfile {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;
}

// Document metadata structure
#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct DocumentMetadata {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub file_type: String,
    pub size: u64,
    pub owner: Principal,
    pub access_level: AccessLevel,
    pub created_at: u64,
    pub updated_at: u64,
    pub tags: Vec<String>,
}

impl Storable for DocumentMetadata {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;
}

// Document access levels
#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq)]
pub enum AccessLevel {
    Public,        // Everyone can view
    Investment,    // Investors and above
    Business,      // Business users and above
    Private,       // Owner and Admin only
}

// Document chunk for large file storage
#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct DocumentChunk {
    pub document_id: String,
    pub chunk_index: u32,
    pub data: Vec<u8>,
}

impl Storable for DocumentChunk {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;
}

// API response types
#[derive(CandidType, Deserialize)]
pub struct RegisterUserRequest {
    pub role: UserRole,
    pub display_name: Option<String>,
    pub email: Option<String>,
}

#[derive(CandidType, Deserialize)]
pub struct UploadDocumentRequest {
    pub name: String,
    pub description: Option<String>,
    pub file_type: String,
    pub access_level: AccessLevel,
    pub data: Vec<u8>,
    pub tags: Vec<String>,
}

#[derive(CandidType, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

// Memory management
thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static USER_PROFILES: RefCell<StableBTreeMap<Principal, UserProfile, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0))),
        )
    );

    static DOCUMENTS: RefCell<StableBTreeMap<String, DocumentMetadata, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1))),
        )
    );

    static DOCUMENT_CHUNKS: RefCell<StableBTreeMap<String, DocumentChunk, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2))),
        )
    );
}

// Helper functions
fn get_caller() -> Principal {
    ic_cdk::caller()
}

fn generate_document_id(name: &str, owner: &Principal) -> String {
    let mut hasher = Sha256::new();
    hasher.update(name.as_bytes());
    hasher.update(owner.as_slice());
    hasher.update(time().to_string().as_bytes());
    format!("{:x}", hasher.finalize())
}

fn has_access_to_document(user_role: &UserRole, doc_access: &AccessLevel, doc_owner: &Principal, caller: &Principal) -> bool {
    match doc_access {
        AccessLevel::Public => true,
        AccessLevel::Investment => matches!(user_role, UserRole::Admin | UserRole::Investor),
        AccessLevel::Business => matches!(user_role, UserRole::Admin | UserRole::Business | UserRole::Investor),
        AccessLevel::Private => *caller == *doc_owner || matches!(user_role, UserRole::Admin),
    }
}

// Canister methods
#[init]
fn init() {
    // Initialize the first admin user
    let caller = get_caller();
    let admin_profile = UserProfile {
        principal: caller,
        role: UserRole::Admin,
        display_name: Some("System Admin".to_string()),
        email: None,
        created_at: time(),
        updated_at: time(),
    };

    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().insert(caller, admin_profile);
    });
}

#[update]
fn register_user(request: RegisterUserRequest) -> ApiResponse<UserProfile> {
    let caller = get_caller();

    // Check if user already exists
    let existing_user = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    if existing_user.is_some() {
        return ApiResponse {
            success: false,
            data: None,
            error: Some("User already registered".to_string()),
        };
    }

    let profile = UserProfile {
        principal: caller,
        role: request.role,
        display_name: request.display_name,
        email: request.email,
        created_at: time(),
        updated_at: time(),
    };

    USER_PROFILES.with(|profiles| {
        profiles.borrow_mut().insert(caller, profile.clone());
    });

    ApiResponse {
        success: true,
        data: Some(profile),
        error: None,
    }
}

#[update]
fn assign_role(target_principal: Principal, new_role: UserRole) -> ApiResponse<UserProfile> {
    let caller = get_caller();

    // Check if caller is admin
    let caller_profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    match caller_profile {
        Some(profile) if profile.role == UserRole::Admin => {},
        _ => return ApiResponse {
            success: false,
            data: None,
            error: Some("Only admins can assign roles".to_string()),
        },
    }

    // Update target user's role
    USER_PROFILES.with(|profiles| {
        let mut profiles = profiles.borrow_mut();
        match profiles.get(&target_principal) {
            Some(mut profile) => {
                profile.role = new_role;
                profile.updated_at = time();
                profiles.insert(target_principal, profile.clone());
                ApiResponse {
                    success: true,
                    data: Some(profile),
                    error: None,
                }
            },
            None => ApiResponse {
                success: false,
                data: None,
                error: Some("User not found".to_string()),
            },
        }
    })
}

#[update]
fn upload_document(request: UploadDocumentRequest) -> ApiResponse<DocumentMetadata> {
    let caller = get_caller();

    // Check if user is registered
    let user_profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    let user_role = match user_profile {
        Some(profile) => profile.role,
        None => return ApiResponse {
            success: false,
            data: None,
            error: Some("User not registered".to_string()),
        },
    };

    // Validate access level based on user role
    let can_upload = match (&user_role, &request.access_level) {
        (UserRole::Admin, _) => true,
        (UserRole::Business, AccessLevel::Business | AccessLevel::Private) => true,
        (UserRole::Investor, AccessLevel::Investment | AccessLevel::Private) => true,
        (UserRole::Guest, AccessLevel::Public) => true,
        _ => false,
    };

    if !can_upload {
        return ApiResponse {
            success: false,
            data: None,
            error: Some("Insufficient permissions for this access level".to_string()),
        };
    }

    let document_id = generate_document_id(&request.name, &caller);
    
    let metadata = DocumentMetadata {
        id: document_id.clone(),
        name: request.name,
        description: request.description,
        file_type: request.file_type,
        size: request.data.len() as u64,
        owner: caller,
        access_level: request.access_level,
        created_at: time(),
        updated_at: time(),
        tags: request.tags,
    };

    // Store document chunks (for simplicity, storing as single chunk)
    let chunk = DocumentChunk {
        document_id: document_id.clone(),
        chunk_index: 0,
        data: request.data,
    };

    DOCUMENTS.with(|docs| {
        docs.borrow_mut().insert(document_id.clone(), metadata.clone());
    });

    DOCUMENT_CHUNKS.with(|chunks| {
        chunks.borrow_mut().insert(format!("{}:0", document_id), chunk);
    });

    ApiResponse {
        success: true,
        data: Some(metadata),
        error: None,
    }
}

#[query]
fn download_document(document_id: String) -> ApiResponse<Vec<u8>> {
    let caller = get_caller();

    let user_profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    let user_role = match user_profile {
        Some(profile) => profile.role,
        None => UserRole::Guest,
    };

    let document = DOCUMENTS.with(|docs| {
        docs.borrow().get(&document_id)
    });

    let doc_metadata = match document {
        Some(doc) => doc,
        None => return ApiResponse {
            success: false,
            data: None,
            error: Some("Document not found".to_string()),
        },
    };

    if !has_access_to_document(&user_role, &doc_metadata.access_level, &doc_metadata.owner, &caller) {
        return ApiResponse {
            success: false,
            data: None,
            error: Some("Access denied".to_string()),
        };
    }

    let chunk_key = format!("{}:0", document_id);
    let chunk = DOCUMENT_CHUNKS.with(|chunks| {
        chunks.borrow().get(&chunk_key)
    });

    match chunk {
        Some(chunk) => ApiResponse {
            success: true,
            data: Some(chunk.data),
            error: None,
        },
        None => ApiResponse {
            success: false,
            data: None,
            error: Some("Document data not found".to_string()),
        },
    }
}

#[query]
fn list_documents() -> ApiResponse<Vec<DocumentMetadata>> {
    let caller = get_caller();

    let user_profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    let user_role = match user_profile {
        Some(profile) => profile.role,
        None => UserRole::Guest,
    };

    let documents: Vec<DocumentMetadata> = DOCUMENTS.with(|docs| {
        docs.borrow()
            .iter()
            .filter_map(|(_, doc)| {
                if has_access_to_document(&user_role, &doc.access_level, &doc.owner, &caller) {
                    Some(doc)
                } else {
                    None
                }
            })
            .collect()
    });

    ApiResponse {
        success: true,
        data: Some(documents),
        error: None,
    }
}

#[query]
fn list_users() -> ApiResponse<Vec<UserProfile>> {
    let caller = get_caller();

    let user_profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    match user_profile {
        Some(profile) if profile.role == UserRole::Admin => {
            let users: Vec<UserProfile> = USER_PROFILES.with(|profiles| {
                profiles.borrow().iter().map(|(_, profile)| profile).collect()
            });

            ApiResponse {
                success: true,
                data: Some(users),
                error: None,
            }
        },
        _ => ApiResponse {
            success: false,
            data: None,
            error: Some("Only admins can list users".to_string()),
        },
    }
}

#[query]
fn get_user_profile() -> ApiResponse<UserProfile> {
    let caller = get_caller();

    let profile = USER_PROFILES.with(|profiles| {
        profiles.borrow().get(&caller)
    });

    match profile {
        Some(profile) => ApiResponse {
            success: true,
            data: Some(profile),
            error: None,
        },
        None => ApiResponse {
            success: false,
            data: None,
            error: Some("User not found".to_string()),
        },
    }
}

// Stable memory management
#[pre_upgrade]
fn pre_upgrade() {
    // Stable structures automatically handle persistence
}

#[post_upgrade]
fn post_upgrade() {
    // Stable structures automatically handle restoration
}