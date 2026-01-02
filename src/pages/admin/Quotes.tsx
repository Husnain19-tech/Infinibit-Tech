import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/clientSafe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { RefreshCw, Trash2, FileText, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuoteSubmission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  description: string;
  services: string[];
  timeline: string;
  budget: string;
  estimated_cost: number | null;
  created_at: string;
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<QuoteSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteSubmission | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("quote_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      toast.error("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;
    
    try {
      const { error } = await supabase
        .from("quote_submissions")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Quote deleted");
      fetchQuotes();
    } catch (error) {
      toast.error("Failed to delete quote");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quote Requests</h1>
          <p className="text-muted-foreground">Manage project quote requests</p>
        </div>
        <Button variant="outline" onClick={fetchQuotes} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Quotes ({quotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No quote requests yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(quote.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">{quote.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${quote.email}`} className="text-primary hover:underline">
                        {quote.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {quote.services.slice(0, 2).map((service) => (
                          <Badge key={service} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {quote.services.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{quote.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{quote.budget}</TableCell>
                    <TableCell>{quote.timeline}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedQuote(quote)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteQuote(quote.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
          </DialogHeader>
          {selectedQuote && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="font-medium">{selectedQuote.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p>
                  <a href={`mailto:${selectedQuote.email}`} className="text-primary hover:underline">
                    {selectedQuote.email}
                  </a>
                </p>
              </div>
              {selectedQuote.company && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p>{selectedQuote.company}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Budget</label>
                <p>{selectedQuote.budget}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Timeline</label>
                <p>{selectedQuote.timeline}</p>
              </div>
              {selectedQuote.estimated_cost && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Estimated Cost</label>
                  <p>${selectedQuote.estimated_cost.toLocaleString()}</p>
                </div>
              )}
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Services</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedQuote.services.map((service) => (
                    <Badge key={service} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="whitespace-pre-wrap">{selectedQuote.description}</p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                <p>{format(new Date(selectedQuote.created_at), "PPpp")}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
