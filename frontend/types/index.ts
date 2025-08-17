import { Principal } from '@dfinity/principal';

export type UserRole = 'Admin' | 'Investor' | 'Business' | 'Guest';

export type AccessLevel = 'Public' | 'Investment' | 'Business' | 'Private';

export interface UserProfile {
  principal: Principal;
  role: UserRole;
  display_name?: string;
  email?: string;
  created_at: bigint;
  updated_at: bigint;
}

export interface DocumentMetadata {
  id: string;
  name: string;
  description?: string;
  file_type: string;
  size: bigint;
  owner: Principal;
  access_level: AccessLevel;
  created_at: bigint;
  updated_at: bigint;
  tags: string[];
}

export interface RegisterUserRequest {
  role: UserRole;
  display_name?: string;
  email?: string;
}

export interface UploadDocumentRequest {
  name: string;
  description?: string;
  file_type: string;
  access_level: AccessLevel;
  data: Uint8Array;
  tags: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}