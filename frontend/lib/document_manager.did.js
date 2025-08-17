export const idlFactory = ({ IDL }) => {
  const UserRole = IDL.Variant({
    'Admin' : IDL.Null,
    'Investor' : IDL.Null,
    'Business' : IDL.Null,
    'Guest' : IDL.Null,
  });
  const RegisterUserRequest = IDL.Record({
    'role' : UserRole,
    'display_name' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
  });
  const UserProfile = IDL.Record({
    'principal' : IDL.Principal,
    'role' : UserRole,
    'display_name' : IDL.Opt(IDL.Text),
    'email' : IDL.Opt(IDL.Text),
    'created_at' : IDL.Nat64,
    'updated_at' : IDL.Nat64,
  });
  const ApiResponse_UserProfile = IDL.Record({
    'success' : IDL.Bool,
    'data' : IDL.Opt(UserProfile),
    'error' : IDL.Opt(IDL.Text),
  });
  const AccessLevel = IDL.Variant({
    'Public' : IDL.Null,
    'Investment' : IDL.Null,
    'Business' : IDL.Null,
    'Private' : IDL.Null,
  });
  const UploadDocumentRequest = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'file_type' : IDL.Text,
    'access_level' : AccessLevel,
    'data' : IDL.Vec(IDL.Nat8),
    'tags' : IDL.Vec(IDL.Text),
  });
  const DocumentMetadata = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'file_type' : IDL.Text,
    'size' : IDL.Nat64,
    'owner' : IDL.Principal,
    'access_level' : AccessLevel,
    'created_at' : IDL.Nat64,
    'updated_at' : IDL.Nat64,
    'tags' : IDL.Vec(IDL.Text),
  });
  const ApiResponse_DocumentMetadata = IDL.Record({
    'success' : IDL.Bool,
    'data' : IDL.Opt(DocumentMetadata),
    'error' : IDL.Opt(IDL.Text),
  });
  const ApiResponse_blob = IDL.Record({
    'success' : IDL.Bool,
    'data' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'error' : IDL.Opt(IDL.Text),
  });
  const ApiResponse_vec_DocumentMetadata = IDL.Record({
    'success' : IDL.Bool,
    'data' : IDL.Opt(IDL.Vec(DocumentMetadata)),
    'error' : IDL.Opt(IDL.Text),
  });
  const ApiResponse_vec_UserProfile = IDL.Record({
    'success' : IDL.Bool,
    'data' : IDL.Opt(IDL.Vec(UserProfile)),
    'error' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'assign_role' : IDL.Func([IDL.Principal, UserRole], [ApiResponse_UserProfile], []),
    'download_document' : IDL.Func([IDL.Text], [ApiResponse_blob], ['query']),
    'get_user_profile' : IDL.Func([], [ApiResponse_UserProfile], ['query']),
    'list_documents' : IDL.Func([], [ApiResponse_vec_DocumentMetadata], ['query']),
    'list_users' : IDL.Func([], [ApiResponse_vec_UserProfile], ['query']),
    'register_user' : IDL.Func([RegisterUserRequest], [ApiResponse_UserProfile], []),
    'upload_document' : IDL.Func([UploadDocumentRequest], [ApiResponse_DocumentMetadata], []),
  });
};