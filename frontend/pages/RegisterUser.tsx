import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { icpService } from '@/lib/icp';
import type { UserRole } from '@/types';
import { UserPlus, Users, Building, Eye, Shield } from 'lucide-react';

export default function RegisterUser() {
  const [role, setRole] = useState<UserRole>('Guest');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { refreshProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "You must be logged in to register",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const request = {
        role,
        display_name: displayName.trim() || undefined,
        email: email.trim() || undefined,
      };

      const response = await icpService.registerUser(request);

      if (response.success) {
        toast({
          title: "Registration Successful",
          description: `Welcome! You are now registered as a ${role}`,
        });
        
        await refreshProfile();
        navigate(`/${role.toLowerCase()}`);
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register user",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'Admin': return <Shield className="h-4 w-4" />;
      case 'Investor': return <Users className="h-4 w-4" />;
      case 'Business': return <Building className="h-4 w-4" />;
      case 'Guest': return <Eye className="h-4 w-4" />;
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'Admin': 
        return 'Full system access - manage users and all documents';
      case 'Investor': 
        return 'Access investment documents and upload private files';
      case 'Business': 
        return 'Upload business documents and manage own files';
      case 'Guest': 
        return 'View public documents only';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Complete Registration
            </CardTitle>
            <CardDescription>
              Choose your role and complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guest">
                      <div className="flex items-center gap-2">
                        {getRoleIcon('Guest')}
                        Guest
                      </div>
                    </SelectItem>
                    <SelectItem value="Investor">
                      <div className="flex items-center gap-2">
                        {getRoleIcon('Investor')}
                        Investor
                      </div>
                    </SelectItem>
                    <SelectItem value="Business">
                      <div className="flex items-center gap-2">
                        {getRoleIcon('Business')}
                        Business
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {getRoleDescription(role)}
                </p>
              </div>

              <div>
                <Label htmlFor="displayName">Display Name (Optional)</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Registering...' : 'Complete Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}