import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileText, Users, Building, LogIn } from 'lucide-react';

export default function Login() {
  const { login, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role.toLowerCase()}`);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      // Navigation will be handled by the useEffect above
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Welcome to DocManager</h1>
          <p className="text-muted-foreground mt-2">
            Secure document management with role-based access
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5" />
              Internet Identity Login
            </CardTitle>
            <CardDescription>
              Secure authentication powered by the Internet Computer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleLogin} className="w-full" size="lg">
              <LogIn className="mr-2 h-5 w-5" />
              Login with Internet Identity
            </Button>
            
            <div className="text-xs text-muted-foreground text-center">
              New users will be registered automatically as Guests
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <Badge variant="outline">Investors</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Access investment documents and reports
            </p>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Building className="h-4 w-4 text-primary" />
              <Badge variant="outline">Business</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Upload and manage business documents
            </p>
          </Card>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 DocManager. Built on Internet Computer.</p>
        </div>
      </div>
    </div>
  );
}