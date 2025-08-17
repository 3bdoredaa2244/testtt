import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, User, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { icpService } from '@/lib/icp';
import type { DocumentMetadata } from '@/types';

interface DocumentListProps {
  refreshTrigger?: number;
}

export function DocumentList({ refreshTrigger }: DocumentListProps) {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDocuments();
  }, [refreshTrigger]);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await icpService.listDocuments();
      
      if (response.success && response.data) {
        setDocuments(response.data);
      } else {
        throw new Error(response.error || 'Failed to load documents');
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (document: DocumentMetadata) => {
    try {
      setDownloading(document.id);
      
      const response = await icpService.downloadDocument(document.id);
      
      if (response.success && response.data) {
        // Create blob and download
        const blob = new Blob([response.data], { type: document.file_type });
        const url = URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        a.download = document.name;
        window.document.body.appendChild(a);
        a.click();
        window.document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast({
          title: "Download Started",
          description: `Downloading ${document.name}`,
        });
      } else {
        throw new Error(response.error || 'Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download document",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) / 1000000).toLocaleDateString();
  };

  const formatFileSize = (bytes: bigint) => {
    const size = Number(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'Public': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Investment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Business': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Private': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Documents ({documents.length})
        </CardTitle>
      </CardHeader>
      
      {documents.map((doc) => (
        <Card key={doc.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold truncate">{doc.name}</h3>
                  <Badge className={getAccessLevelColor(doc.access_level)}>
                    {doc.access_level}
                  </Badge>
                </div>
                
                {doc.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {doc.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(doc.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {doc.owner.toString().slice(0, 8)}...
                  </div>
                  <div>
                    Size: {formatFileSize(doc.size)}
                  </div>
                  <div>
                    Type: {doc.file_type}
                  </div>
                </div>

                {doc.tags.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <Tag className="h-3 w-3 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => handleDownload(doc)}
                disabled={downloading === doc.id}
                variant="outline"
                size="sm"
                className="ml-4"
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading === doc.id ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}