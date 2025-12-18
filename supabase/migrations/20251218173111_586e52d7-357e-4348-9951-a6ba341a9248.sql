-- Create services table for dynamic service management
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Settings',
  image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  benefits JSONB DEFAULT '[]',
  tech_stack JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can view active services
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
USING (is_active = true);

-- Admins can view all services (including inactive)
CREATE POLICY "Admins can view all services"
ON public.services
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Only owners and developers can manage services
CREATE POLICY "Owners and developers can manage services"
ON public.services
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'owner') OR has_role(auth.uid(), 'developer'))
WITH CHECK (has_role(auth.uid(), 'owner') OR has_role(auth.uid(), 'developer'));

-- Create trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_active ON public.services(is_active);
CREATE INDEX idx_services_order ON public.services(display_order);

-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('service-images', 'service-images', true);

-- Storage policies for service images
CREATE POLICY "Anyone can view service images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'service-images');

CREATE POLICY "Admins can upload service images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'service-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update service images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'service-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete service images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'service-images' AND is_admin(auth.uid()));