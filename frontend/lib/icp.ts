import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { idlFactory } from './document_manager.did.js';
import type { 
  UserProfile, 
  DocumentMetadata, 
  RegisterUserRequest, 
  UploadDocumentRequest,
  ApiResponse,
  UserRole
} from '../types';

// Types for the canister interface
export interface DocumentManagerActor {
  register_user: (request: RegisterUserRequest) => Promise<ApiResponse<UserProfile>>;
  assign_role: (principal: Principal, role: UserRole) => Promise<ApiResponse<UserProfile>>;
  upload_document: (request: UploadDocumentRequest) => Promise<ApiResponse<DocumentMetadata>>;
  download_document: (id: string) => Promise<ApiResponse<Uint8Array>>;
  list_documents: () => Promise<ApiResponse<DocumentMetadata[]>>;
  list_users: () => Promise<ApiResponse<UserProfile[]>>;
  get_user_profile: () => Promise<ApiResponse<UserProfile>>;
}

class ICPService {
  private agent: HttpAgent | null = null;
  private authClient: AuthClient | null = null;
  private actor: DocumentManagerActor | null = null;
  private canisterId = process.env.CANISTER_ID_DOCUMENT_MANAGER || 'rrkah-fqaaa-aaaaa-aaaaq-cai';

  async init(): Promise<void> {
    this.authClient = await AuthClient.create();
    
    const isLocal = process.env.NODE_ENV !== 'production';
    
    this.agent = new HttpAgent({
      host: isLocal ? 'http://localhost:4943' : 'https://ic0.app',
    });

    if (isLocal) {
      await this.agent.fetchRootKey();
    }

    this.createActor();
  }

  private createActor(): void {
    if (!this.agent) throw new Error('Agent not initialized');
    
    this.actor = Actor.createActor<DocumentManagerActor>(idlFactory, {
      agent: this.agent,
      canisterId: this.canisterId,
    });
  }

  async login(): Promise<boolean> {
    if (!this.authClient) throw new Error('AuthClient not initialized');

    return new Promise((resolve) => {
      this.authClient!.login({
        identityProvider: process.env.NODE_ENV === 'production' 
          ? 'https://identity.ic0.app'
          : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai`,
        onSuccess: async () => {
          const identity = this.authClient!.getIdentity();
          this.agent!.replaceIdentity(identity);
          this.createActor();
          resolve(true);
        },
        onError: () => resolve(false),
      });
    });
  }

  async logout(): Promise<void> {
    if (!this.authClient) return;
    await this.authClient.logout();
    this.agent!.replaceIdentity(this.authClient.getIdentity());
    this.createActor();
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.authClient) return false;
    return await this.authClient.isAuthenticated();
  }

  getPrincipal(): Principal | null {
    if (!this.authClient) return null;
    return this.authClient.getIdentity().getPrincipal();
  }

  getActor(): DocumentManagerActor {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor;
  }

  // Helper methods for common operations
  async registerUser(request: RegisterUserRequest): Promise<ApiResponse<UserProfile>> {
    return this.getActor().register_user(request);
  }

  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return this.getActor().get_user_profile();
  }

  async uploadDocument(request: UploadDocumentRequest): Promise<ApiResponse<DocumentMetadata>> {
    return this.getActor().upload_document(request);
  }

  async listDocuments(): Promise<ApiResponse<DocumentMetadata[]>> {
    return this.getActor().list_documents();
  }

  async downloadDocument(id: string): Promise<ApiResponse<Uint8Array>> {
    return this.getActor().download_document(id);
  }

  async listUsers(): Promise<ApiResponse<UserProfile[]>> {
    return this.getActor().list_users();
  }

  async assignRole(principal: Principal, role: UserRole): Promise<ApiResponse<UserProfile>> {
    return this.getActor().assign_role(principal, role);
  }
}

export const icpService = new ICPService();