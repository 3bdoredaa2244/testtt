import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentList } from '@/components/DocumentList';
import { UploadForm } from '@/components/UploadForm';
import { Building, FileText, Upload, Lock } from 'lucide-react';

export default function BusinessDashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const onUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building className="h-8 w-8 text-primary" />
            Business Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your business documents and uploads</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Managed</div>
            <p className="text-xs text-muted-foreground">
              View and manage your uploads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload Access</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Full</div>
            <p className="text-xs text-muted-foreground">
              Upload business & private docs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Level</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Business</div>
            <p className="text-xs text-muted-foreground">
              Secure business-level access
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Document</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <UploadForm onUploadSuccess={onUploadSuccess} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentList refreshTrigger={refreshTrigger} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Business Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10">
              <h3 className="font-semibold mb-2">Document Management</h3>
              <p className="text-sm text-muted-foreground">
                Organize and secure your business documents with role-based access control.
              </p>
            </Card>
            
            <Card className="p-4 bg-gradient-to-r from-accent/10 to-primary/10">
              <h3 className="font-semibold mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Share documents securely with investors and partners.
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}