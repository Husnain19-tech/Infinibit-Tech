import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, Linkedin, Briefcase, MapPin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { GlowingOrb } from "@/components/animations";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  company: z.string()
    .trim()
    .max(100, { message: "Company name must be less than 100 characters" })
    .optional()
    .or(z.literal("")),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    mode: "onChange",
  });

  const handleSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("submit-form", {
        body: {
          type: "contact",
          name: values.name,
          email: values.email,
          company: values.company || undefined,
          message: values.message,
        },
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "infinibitech@gmail.com",
      href: "mailto:infinibitech@gmail.com",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+92 314 7647998",
      href: "https://wa.me/923147647998",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Lahore, Pakistan",
      href: null,
    },
  ];

  return (
    <section ref={ref} id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.5 }}
      >
        <img
          src="/images/services/call-center-2.jpg"
          alt="Contact Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </motion.div>

      {/* Glowing Orbs */}
      <GlowingOrb x="10%" y="80%" size={500} intensity={0.1} />
      <GlowingOrb x="90%" y="20%" size={400} color="hsl(193, 100%, 39%)" intensity={0.08} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 glass-card px-4 py-2"
              initial={{ scale: 0.9 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm text-primary">Get In Touch</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Let's Build <motion.span
                className="neon-text"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(0, 229, 255, 0.5)",
                    "0 0 40px rgba(0, 229, 255, 0.8)",
                    "0 0 20px rgba(0, 229, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >Together</motion.span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with cutting-edge technology? Let's discuss your project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  variants={fadeInLeft}
                  custom={index}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <motion.div
                        className="glass-card p-6"
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className="p-3 bg-primary/10 rounded-xl"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <method.icon className="w-6 h-6 text-primary" />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">{method.title}</h3>
                            <p className="text-sm text-muted-foreground">{method.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  ) : (
                    <motion.div
                      className="glass-card p-6"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <method.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{method.title}</h3>
                          <p className="text-sm text-muted-foreground">{method.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                className="glass-card p-6"
                variants={fadeInLeft}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-semibold mb-4">Connect With Us</h3>
                <div className="flex flex-col space-y-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/husnain-shabeer-099557268/" },
                    { icon: Briefcase, label: "Upwork Profile", href: "https://www.upwork.com/freelancers/~01ba20040044647ec2" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Form {...form}>
                <motion.form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="glass-card p-8 space-y-6"
                  whileHover={{ boxShadow: "0 0 40px rgba(0, 229, 255, 0.1)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="bg-secondary/50 border-border focus:border-primary transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="bg-secondary/50 border-border focus:border-primary transition-colors"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-destructive text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Company</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your company name (optional)"
                            className="bg-secondary/50 border-border focus:border-primary transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Project Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            rows={6}
                            className="bg-secondary/50 border-border focus:border-primary transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs" />
                      </FormItem>
                    )}
                  />

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting || !form.formState.isValid}
                      className="w-full glass-button bg-primary text-primary-foreground hover:bg-primary/90 group"
                    >
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          Sending...
                        </motion.span>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
