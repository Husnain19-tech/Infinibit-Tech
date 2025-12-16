-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for quote form submissions
CREATE TABLE public.quote_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  description TEXT NOT NULL,
  services TEXT[] NOT NULL,
  timeline TEXT NOT NULL,
  budget TEXT NOT NULL,
  estimated_cost INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat widget submissions
CREATE TABLE public.chat_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for inserting (public can submit forms)
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can submit quote requests"
ON public.quote_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can submit chat messages"
ON public.chat_submissions
FOR INSERT
WITH CHECK (true);

-- Restrict reading to authenticated users only (admin access)
CREATE POLICY "Only authenticated users can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can view quote submissions"
ON public.quote_submissions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only authenticated users can view chat submissions"
ON public.chat_submissions
FOR SELECT
TO authenticated
USING (true);