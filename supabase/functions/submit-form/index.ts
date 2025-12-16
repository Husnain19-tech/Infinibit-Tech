import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  type: "contact";
  name: string;
  email: string;
  company?: string;
  message: string;
}

interface QuoteSubmission {
  type: "quote";
  name: string;
  email: string;
  company?: string;
  description: string;
  services: string[];
  timeline: string;
  budget: string;
  estimatedCost?: number;
}

interface ChatSubmission {
  type: "chat";
  name: string;
  email: string;
  message: string;
}

type FormSubmission = ContactSubmission | QuoteSubmission | ChatSubmission;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const submission: FormSubmission = await req.json();
    
    console.log(`Processing ${submission.type} form submission from ${submission.email}`);

    let result;
    let tableName: string;

    switch (submission.type) {
      case "contact":
        tableName = "contact_submissions";
        result = await supabase.from("contact_submissions").insert({
          name: submission.name,
          email: submission.email,
          company: submission.company || null,
          message: submission.message,
        });
        break;

      case "quote":
        tableName = "quote_submissions";
        result = await supabase.from("quote_submissions").insert({
          name: submission.name,
          email: submission.email,
          company: submission.company || null,
          description: submission.description,
          services: submission.services,
          timeline: submission.timeline,
          budget: submission.budget,
          estimated_cost: submission.estimatedCost || null,
        });
        break;

      case "chat":
        tableName = "chat_submissions";
        result = await supabase.from("chat_submissions").insert({
          name: submission.name,
          email: submission.email,
          message: submission.message,
        });
        break;

      default:
        throw new Error("Invalid submission type");
    }

    if (result.error) {
      console.error(`Error inserting into ${tableName}:`, result.error);
      throw result.error;
    }

    console.log(`Successfully saved ${submission.type} submission to ${tableName}`);

    return new Response(
      JSON.stringify({ success: true, message: "Form submitted successfully" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error processing form submission:", errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
