import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Upload, Lock, Share, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary rounded-full">
              <Building className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Business Solutions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Securely manage and share your business documents with investors and partners 
            using blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/login">
                Business Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">
                Register Business
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Business Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <CardHeader className="text-center">
              <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Document Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Upload and organize business documents with advanced metadata and tagging.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="text-center">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Fine-grained permissions to control who can access your sensitive documents.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="text-center">
              <Share className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Secure Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Share documents securely with investors, partners, and stakeholders.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect for Your Business Needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Fundraising</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share pitch decks, financial statements, and due diligence materials with potential investors.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Legal Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Store and share contracts, agreements, and legal documents with controlled access.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Financial Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Distribute quarterly reports, audit documents, and financial statements securely.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Product Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share product specs, roadmaps, and technical documentation with team members.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintain audit trails and compliance documentation with blockchain verification.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-lg">Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Collaborate with partners and stakeholders while maintaining document security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Businesses Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground">
                    Military-grade encryption and blockchain immutability for maximum security.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Easy Integration</h3>
                  <p className="text-muted-foreground">
                    Simple APIs and user-friendly interface that works with your existing workflow.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Cost Effective</h3>
                  <p className="text-muted-foreground">
                    Reduce infrastructure costs with our decentralized storage solution.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Scalable Platform</h3>
                  <p className="text-muted-foreground">
                    Grows with your business from startup to enterprise scale.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">24/7 Availability</h3>
                  <p className="text-muted-foreground">
                    Decentralized infrastructure ensures your documents are always accessible.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-6 w-6 text-success mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Audit Trail</h3>
                  <p className="text-muted-foreground">
                    Complete history of document access and modifications for compliance.
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
            <h2 className="text-3xl font-bold">Transform Your Business</h2>
            <p className="text-muted-foreground">
              Start securing and managing your business documents with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/login">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/register">
                  Register Business
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}