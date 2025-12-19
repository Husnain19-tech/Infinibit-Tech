import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface TechCategory {
  category: string;
  technologies: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  image_url: string | null;
  gallery_images: string[];
  benefits: ServiceBenefit[];
  tech_stack: Record<string, string[]>;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceFormData {
  slug: string;
  title: string;
  short_description: string;
  description: string;
  icon: string;
  image_url?: string | null;
  gallery_images?: string[];
  benefits?: ServiceBenefit[];
  tech_stack?: Record<string, string[]>;
  is_active?: boolean;
  display_order?: number;
}

// Helper to convert database row to Service type
const mapDbToService = (row: any): Service => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  short_description: row.short_description,
  description: row.description,
  icon: row.icon,
  image_url: row.image_url,
  gallery_images: row.gallery_images || [],
  benefits: (row.benefits as ServiceBenefit[]) || [],
  tech_stack: (row.tech_stack as Record<string, string[]>) || {},
  is_active: row.is_active,
  display_order: row.display_order,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

// Helper to convert ServiceFormData to database insert format
const mapServiceToDb = (data: ServiceFormData) => ({
  slug: data.slug,
  title: data.title,
  short_description: data.short_description,
  description: data.description,
  icon: data.icon,
  image_url: data.image_url,
  gallery_images: data.gallery_images,
  benefits: data.benefits as unknown as Json,
  tech_stack: data.tech_stack as unknown as Json,
  is_active: data.is_active,
  display_order: data.display_order,
});

export function useServices() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbToService);
    },
  });

  const createService = useMutation({
    mutationFn: async (serviceData: ServiceFormData) => {
      const { data, error } = await supabase
        .from("services")
        .insert([mapServiceToDb(serviceData)])
        .select()
        .single();

      if (error) throw error;
      return mapDbToService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error creating service", description: error.message, variant: "destructive" });
    },
  });

  const updateService = useMutation({
    mutationFn: async ({ id, ...serviceData }: ServiceFormData & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(mapServiceToDb(serviceData))
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return mapDbToService(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating service", description: error.message, variant: "destructive" });
    },
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting service", description: error.message, variant: "destructive" });
    },
  });

  const toggleServiceActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("services")
        .update({ is_active })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({ title: "Service status updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Error updating service", description: error.message, variant: "destructive" });
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("service-images")
      .getPublicUrl(fileName);

    return publicUrl;
  };

  return {
    services,
    isLoading,
    error,
    createService,
    updateService,
    deleteService,
    toggleServiceActive,
    uploadImage,
  };
}

export function usePublicServices() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["public-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return (data || []).map(mapDbToService);
    },
  });

  return { services, isLoading };
}
