import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/clientSafe";
import { useToast } from "@/hooks/use-toast";
import { mockPortfolioProjects } from "@/data/portfolioData";

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  external_url: string | null;
  description: string;
  features: string[];
  tech_stack: string[];
  industry: string | null;
  project_type: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioFormData {
  title: string;
  category: string;
  image_url?: string | null;
  external_url?: string | null;
  description: string;
  features?: string[];
  tech_stack?: string[];
  industry?: string | null;
  project_type?: string | null;
  is_featured?: boolean;
  is_active?: boolean;
  display_order?: number;
}

export function usePortfolio() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as PortfolioProject[];
    },
  });

  const createProject = useMutation({
    mutationFn: async (projectData: PortfolioFormData) => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating project", description: error.message, variant: "destructive" });
    },
  });

  const updateProject = useMutation({
    mutationFn: async ({ id, ...projectData }: PortfolioFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("portfolio_projects")
        .update(projectData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    },
  });

  const toggleProjectActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .update({ is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const toggleProjectFeatured = useMutation({
    mutationFn: async ({ id, is_featured }: { id: string; is_featured: boolean }) => {
      const { error } = await supabase
        .from("portfolio_projects")
        .update({ is_featured })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-projects"] });
      toast({ title: "Project featured status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating project", description: error.message, variant: "destructive" });
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  return {
    projects,
    isLoading,
    error,
    createProject,
    updateProject,
    deleteProject,
    toggleProjectActive,
    toggleProjectFeatured,
    uploadImage,
  };
}

export function usePublicPortfolio() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["public-portfolio"],
    queryFn: async () => {
      try {
        const fetchPromise = supabase
          .from("portfolio_projects")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Supabase fetch timeout")), 3000)
        );

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

        if (error) throw error;

        if (data && data.length > 0) {
          return data as PortfolioProject[];
        }
      } catch (err) {
        console.warn("Portfolio fetch failed or timed out, using mock data.", err);
      }

      // Fallback to mock data if empty or error
      return mockPortfolioProjects;
    },
  });

  return { projects, isLoading };
}
