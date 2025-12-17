-- Add delete policies for authenticated users
CREATE POLICY "Authenticated users can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete quote submissions"
ON public.quote_submissions
FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete chat submissions"
ON public.chat_submissions
FOR DELETE
TO authenticated
USING (true);