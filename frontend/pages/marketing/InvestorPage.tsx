import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, FileText, Users, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-full">
              <TrendingUp className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Investor Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access exclusive investment documents, due diligence materials, and secure file sharing 
            on the Internet Computer blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/login">
                Access Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">
                Register as Investor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Investor Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Internet Identity authentication ensures your investment data remains secure and private.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Investment Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Access exclusive investment reports, prospectuses, and financial statements.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Portfolio Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Upload and organize your private investment files with role-based permissions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Blockchain Security</h3>
                  <p className="text-muted-foreground">
                    Built on Internet Computer for ultimate security and decentralization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Role-Based Access</h3>
                  <p className="text-muted-foreground">
                    Sophisticated permission system ensures proper document access control.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Real-Time Updates</h3>
                  <p className="text-muted-foreground">
                    Get instant notifications when new investment documents are available.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Compliance Ready</h3>
                  <p className="text-muted-foreground">
                    Built-in audit trails and compliance features for regulatory requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Global Access</h3>
                  <p className="text-muted-foreground">
                    Access your investment documents from anywhere in the world, 24/7.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Privacy First</h3>
                  <p className="text-muted-foreground">
                    Your data remains private and under your control at all times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8 text-center bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground">
              Join our secure investment platform and access exclusive documents today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/login">
                  Access Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">
                  Create Account
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}