import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentList } from '@/components/DocumentList';
import { Eye, FileText, UserPlus, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GuestDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Eye className="h-8 w-8 text-primary" />
            Guest Dashboard
          </h1>
          <p className="text-muted-foreground">Access public documents and explore platform features</p>
        </div>
        <Button asChild>
          <Link to="/register">
            <UserPlus className="mr-2 h-4 w-4" />
            Upgrade Account
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Access</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Available</div>
            <p className="text-xs text-muted-foreground">
              View public documents only
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload Access</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Limited</div>
            <p className="text-xs text-muted-foreground">
              Public documents only
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Level</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Guest</div>
            <p className="text-xs text-muted-foreground">
              Basic access level
            </p>
          </CardContent>
        </Card>
      </div>

      <DocumentList />

      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Get more features and access by upgrading your account type.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <h3 className="font-semibold mb-2">Investor Account</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Access exclusive investment documents and upload private files.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/register">Become Investor</Link>
              </Button>
            </Card>
            
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <h3 className="font-semibold mb-2">Business Account</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Upload and manage business documents with full access control.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/register">Business Signup</Link>
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}