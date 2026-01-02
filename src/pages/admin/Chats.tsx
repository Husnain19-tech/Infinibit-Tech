import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/clientSafe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { RefreshCw, Trash2, MessageCircle, Eye } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function Chats() {
  const [chats, setChats] = useState<ChatSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<ChatSubmission | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("chat_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      toast.error("Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;
    
    try {
      const { error } = await supabase
        .from("chat_submissions")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Chat deleted");
      fetchChats();
    } catch (error) {
      toast.error("Failed to delete chat");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chat Messages</h1>
          <p className="text-muted-foreground">Manage chat widget submissions</p>
        </div>
        <Button variant="outline" onClick={fetchChats} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            All Chats ({chats.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chats.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No chat messages yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(chat.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">{chat.name}</TableCell>
                    <TableCell>
                      <a href={`mailto:${chat.email}`} className="text-primary hover:underline">
                        {chat.email}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{chat.message}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedChat(chat)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteChat(chat.id)}
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
      <Dialog open={!!selectedChat} onOpenChange={() => setSelectedChat(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat Details</DialogTitle>
          </DialogHeader>
          {selectedChat && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="font-medium">{selectedChat.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p>
                  <a href={`mailto:${selectedChat.email}`} className="text-primary hover:underline">
                    {selectedChat.email}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Message</label>
                <p className="whitespace-pre-wrap">{selectedChat.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                <p>{format(new Date(selectedChat.created_at), "PPpp")}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
