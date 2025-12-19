-- Create portfolio_projects table
CREATE TABLE public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  external_url TEXT,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  industry TEXT,
  project_type TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Public can view active projects
CREATE POLICY "Anyone can view active portfolio projects"
ON public.portfolio_projects
FOR SELECT
USING (is_active = true);

-- Admins can view all projects
CREATE POLICY "Admins can view all portfolio projects"
ON public.portfolio_projects
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Only owners and developers can manage projects
CREATE POLICY "Owners and developers can manage portfolio projects"
ON public.portfolio_projects
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'owner') OR has_role(auth.uid(), 'developer'))
WITH CHECK (has_role(auth.uid(), 'owner') OR has_role(auth.uid(), 'developer'));

-- Create trigger for updated_at
CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON public.portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_portfolio_category ON public.portfolio_projects(category);
CREATE INDEX idx_portfolio_active ON public.portfolio_projects(is_active);
CREATE INDEX idx_portfolio_order ON public.portfolio_projects(display_order);

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage policies
CREATE POLICY "Anyone can view portfolio images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update portfolio images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete portfolio images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images' AND is_admin(auth.uid()));