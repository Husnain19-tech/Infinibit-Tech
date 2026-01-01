-- Fix PUBLIC_DATA_EXPOSURE: Restrict submissions access to admins only

-- Drop existing overly permissive policies on contact_submissions
DROP POLICY IF EXISTS "Only authenticated users can view contact submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete contact submissions" ON contact_submissions;

-- Create admin-only policies for contact_submissions
CREATE POLICY "Admins can view contact submissions" ON contact_submissions
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Owners can delete contact submissions" ON contact_submissions
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role));

-- Drop existing overly permissive policies on quote_submissions
DROP POLICY IF EXISTS "Only authenticated users can view quote submissions" ON quote_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete quote submissions" ON quote_submissions;

-- Create admin-only policies for quote_submissions
CREATE POLICY "Admins can view quote submissions" ON quote_submissions
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Owners can delete quote submissions" ON quote_submissions
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role));

-- Drop existing overly permissive policies on chat_submissions
DROP POLICY IF EXISTS "Only authenticated users can view chat submissions" ON chat_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete chat submissions" ON chat_submissions;

-- Create admin-only policies for chat_submissions
CREATE POLICY "Admins can view chat submissions" ON chat_submissions
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Owners can delete chat submissions" ON chat_submissions
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'owner'::app_role));