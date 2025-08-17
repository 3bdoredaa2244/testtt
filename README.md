# DocManager ICP - Role-Based Document Management

A complete Internet Computer (ICP) application featuring role-based document management with Internet Identity authentication.

## Features

- **Internet Identity Authentication** - Secure login using Internet Computer's identity system
- **Role-Based Access Control** - Admin, Investor, Business, and Guest roles
- **Document Upload/Download** - Secure file storage with chunking support
- **Professional UI** - Modern React frontend with shadcn/ui components
- **Blockchain Backend** - Rust canister with stable storage

## Architecture

### Backend (Rust Canister)
- User registration with roles (Admin, Investor, Business, Guest)
- Document management with access levels (Public, Investment, Business, Private)
- Chunked file storage for large documents (>2MB)
- Role-based permissions system

### Frontend (React + TypeScript)
- Internet Identity integration
- Role-specific dashboards
- Document upload/download with progress
- Marketing pages for each user type
- Responsive design with Tailwind CSS

## Quick Start

### Prerequisites
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) installed
- [Node.js](https://nodejs.org/) (v16 or later)
- [Rust](https://rustup.rs/) toolchain

### Installation

1. **Clone and setup**:
```bash
git clone <your-repo-url>
cd docmanager-icp
npm install
```

2. **Start local Internet Computer**:
```bash
dfx start --background
```

3. **Deploy the canister**:
```bash
dfx deploy
```

4. **Start the frontend**:
```bash
npm run dev
```

5. **Access the application**:
   - Frontend: http://localhost:5173
   - Candid UI: http://localhost:4943/?canisterId={canister-id}&id={document_manager-canister-id}

## User Roles & Permissions

| Role | Upload Access | View Access | Admin Functions |
|------|---------------|-------------|-----------------|
| **Guest** | Public only | Public only | None |
| **Investor** | Investment, Private | Public, Investment | None |
| **Business** | Business, Private | Public, Business | None |
| **Admin** | All levels | All documents | User management |

## Document Access Levels

- **Public**: Viewable by all users
- **Investment**: Investors and above
- **Business**: Business users and above  
- **Private**: Document owner and Admins only

## API Reference

### Canister Methods

```rust
// User Management
register_user(request: RegisterUserRequest) -> ApiResponse<UserProfile>
assign_role(principal: Principal, role: UserRole) -> ApiResponse<UserProfile>
get_user_profile() -> ApiResponse<UserProfile>
list_users() -> ApiResponse<Vec<UserProfile>>

// Document Management  
upload_document(request: UploadDocumentRequest) -> ApiResponse<DocumentMetadata>
download_document(id: String) -> ApiResponse<Vec<u8>>
list_documents() -> ApiResponse<Vec<DocumentMetadata>>
```

## Development

### Project Structure
```
src/
├── document_manager/        # Rust canister source
│   ├── src/lib.rs          # Main canister logic
│   └── document_manager.did # Candid interface
├── components/             # React components
├── pages/                  # Application pages
├── contexts/              # React contexts
├── lib/                   # Utilities and ICP integration
└── types/                 # TypeScript type definitions
```

### Adding New Features

1. **Backend**: Modify `src/document_manager/src/lib.rs`
2. **Frontend**: Add components in `src/components/`
3. **Types**: Update `src/types/index.ts`
4. **Routing**: Modify `src/App.tsx`

### Deployment

For production deployment:

```bash
# Deploy to IC mainnet
dfx deploy --network ic

# Or deploy to local testnet
dfx deploy --network local
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions and support:
- Create an issue on GitHub
- Check the [Internet Computer documentation](https://internetcomputer.org/docs/)
- Join the [ICP Developer Forum](https://forum.dfinity.org/)