import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schemas
const contactSchema = z.object({
  type: z.literal("contact"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional().nullable(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

const quoteSchema = z.object({
  type: z.literal("quote"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional().nullable(),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(2000, "Description must be less than 2000 characters"),
  services: z.array(z.string().max(100)).min(1, "At least one service is required").max(20, "Too many services selected"),
  timeline: z.string().min(1).max(50, "Timeline must be less than 50 characters"),
  budget: z.string().min(1).max(50, "Budget must be less than 50 characters"),
  estimatedCost: z.number().int().min(0).max(10000000).optional().nullable(),
});

const chatSchema = z.object({
  type: z.literal("chat"),
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactSubmission = z.infer<typeof contactSchema>;
type QuoteSubmission = z.infer<typeof quoteSchema>;
type ChatSubmission = z.infer<typeof chatSchema>;
type FormSubmission = ContactSubmission | QuoteSubmission | ChatSubmission;

// Simple rate limiting (in-memory, resets on function restart)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const rawSubmission = await req.json();
    
    // Validate and parse based on type
    let submission: FormSubmission;
    let tableName: string;
    
    console.log(`Processing ${rawSubmission.type} form submission`);

    switch (rawSubmission.type) {
      case "contact": {
        const parsed = contactSchema.safeParse(rawSubmission);
        if (!parsed.success) {
          console.warn("Contact validation failed:", parsed.error.errors);
          return new Response(
            JSON.stringify({ success: false, error: "Invalid input data", details: parsed.error.errors[0]?.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        submission = parsed.data;
        tableName = "contact_submissions";
        
        const { error } = await supabase.from("contact_submissions").insert({
          name: submission.name,
          email: submission.email,
          company: submission.company || null,
          message: submission.message,
        });
        
        if (error) {
          console.error(`Error inserting into ${tableName}:`, error);
          throw error;
        }
        break;
      }

      case "quote": {
        const parsed = quoteSchema.safeParse(rawSubmission);
        if (!parsed.success) {
          console.warn("Quote validation failed:", parsed.error.errors);
          return new Response(
            JSON.stringify({ success: false, error: "Invalid input data", details: parsed.error.errors[0]?.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        submission = parsed.data;
        tableName = "quote_submissions";
        
        const { error } = await supabase.from("quote_submissions").insert({
          name: submission.name,
          email: submission.email,
          company: submission.company || null,
          description: submission.description,
          services: submission.services,
          timeline: submission.timeline,
          budget: submission.budget,
          estimated_cost: submission.estimatedCost || null,
        });
        
        if (error) {
          console.error(`Error inserting into ${tableName}:`, error);
          throw error;
        }
        break;
      }

      case "chat": {
        const parsed = chatSchema.safeParse(rawSubmission);
        if (!parsed.success) {
          console.warn("Chat validation failed:", parsed.error.errors);
          return new Response(
            JSON.stringify({ success: false, error: "Invalid input data", details: parsed.error.errors[0]?.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        submission = parsed.data;
        tableName = "chat_submissions";
        
        const { error } = await supabase.from("chat_submissions").insert({
          name: submission.name,
          email: submission.email,
          message: submission.message,
        });
        
        if (error) {
          console.error(`Error inserting into ${tableName}:`, error);
          throw error;
        }
        break;
      }

      default:
        console.warn("Invalid submission type received:", rawSubmission.type);
        return new Response(
          JSON.stringify({ success: false, error: "Invalid submission type" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
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
      JSON.stringify({ success: false, error: "An error occurred while processing your request" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
