import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, Users, Building, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-full">
              <FileText className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            DocManager ICP
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Secure document management with role-based access control, powered by Internet Computer blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link to="/login">
                <Shield className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/business">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <Users className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">For Investors</h3>
                <p className="text-muted-foreground">Access exclusive investment documents and reports</p>
                <Button variant="outline" asChild>
                  <Link to="/investor">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <Building className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">For Business</h3>
                <p className="text-muted-foreground">Secure document sharing and management</p>
                <Button variant="outline" asChild>
                  <Link to="/business">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <Shield className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Blockchain Security</h3>
                <p className="text-muted-foreground">Built on Internet Computer for maximum security</p>
                <Button variant="outline" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
