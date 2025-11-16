import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const services = [
  { id: "ai-automation", name: "AI Automation Solutions", basePrice: 15000 },
  { id: "custom-software", name: "Custom Software Development", basePrice: 25000 },
  { id: "mobile-app", name: "Mobile App Development", basePrice: 20000 },
  { id: "web-app", name: "Web Application Development", basePrice: 18000 },
  { id: "ecommerce", name: "E-commerce Solutions", basePrice: 22000 },
  { id: "crm-erp", name: "CRM & ERP Systems", basePrice: 30000 },
  { id: "ui-ux", name: "UI/UX Design", basePrice: 8000 },
  { id: "api", name: "API Development & Integration", basePrice: 12000 },
  { id: "call-center", name: "Call Center Software", basePrice: 28000 },
  { id: "consulting", name: "Business Consultancy", basePrice: 10000 },
  { id: "corporate", name: "Corporate Solutions", basePrice: 35000 },
  { id: "data-engineering", name: "Data Engineering", basePrice: 25000 },
  { id: "chatbot", name: "AI Chatbot Development", basePrice: 15000 },
  { id: "saas", name: "SaaS Development", basePrice: 40000 },
  { id: "marketing", name: "Digital Marketing", basePrice: 8000 },
  { id: "qa", name: "Quality Assurance & Testing", basePrice: 12000 },
];

const timelines = [
  { value: "1-2", label: "1-2 months", multiplier: 1.5 },
  { value: "2-4", label: "2-4 months", multiplier: 1.2 },
  { value: "4-6", label: "4-6 months", multiplier: 1.0 },
  { value: "6+", label: "6+ months", multiplier: 0.9 },
];

const budgets = [
  { value: "10-25", label: "$10,000 - $25,000" },
  { value: "25-50", label: "$25,000 - $50,000" },
  { value: "50-100", label: "$50,000 - $100,000" },
  { value: "100+", label: "$100,000+" },
];

const step1Schema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service"),
});

const step2Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  description: z.string().min(10, "Please provide more details about your project"),
});

const step3Schema = z.object({
  timeline: z.string().min(1, "Please select a timeline"),
  budget: z.string().min(1, "Please select a budget range"),
});

export default function Quote() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: [] as string[],
    name: "",
    email: "",
    company: "",
    description: "",
    timeline: "",
    budget: "",
  });

  const progress = (step / 4) * 100;

  const calculateEstimate = () => {
    const selectedServices = services.filter((s) =>
      formData.services.includes(s.id)
    );
    const baseTotal = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);
    const timelineMultiplier =
      timelines.find((t) => t.value === formData.timeline)?.multiplier || 1;
    return Math.round(baseTotal * timelineMultiplier);
  };

  const toggleService = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      const result = step1Schema.safeParse({ services: formData.services });
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      const result = step2Schema.safeParse({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        description: formData.description,
      });
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      const result = step3Schema.safeParse({
        timeline: formData.timeline,
        budget: formData.budget,
      });
      if (!result.success) {
        toast({
          title: "Validation Error",
          description: result.error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Quote Request Submitted!",
      description: "Our team will contact you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5 pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Get Your Project Quote
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your project and get an instant estimate
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span className={step >= 1 ? "text-primary font-semibold" : ""}>
              Services
            </span>
            <span className={step >= 2 ? "text-primary font-semibold" : ""}>
              Details
            </span>
            <span className={step >= 3 ? "text-primary font-semibold" : ""}>
              Timeline
            </span>
            <span className={step >= 4 ? "text-primary font-semibold" : ""}>
              Estimate
            </span>
          </div>
        </div>

        <Card className="glass-card p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Select Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.services.includes(service.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          From ${service.basePrice.toLocaleString()}
                        </p>
                      </div>
                      {formData.services.includes(service.id) && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Project Details</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Tell us about your project requirements..."
                    rows={5}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Timeline & Budget</h2>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Project Timeline *
                  </Label>
                  <RadioGroup
                    value={formData.timeline}
                    onValueChange={(value) =>
                      setFormData({ ...formData, timeline: value })
                    }
                  >
                    {timelines.map((timeline) => (
                      <div
                        key={timeline.value}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <RadioGroupItem value={timeline.value} id={timeline.value} />
                        <Label
                          htmlFor={timeline.value}
                          className="flex-1 cursor-pointer"
                        >
                          {timeline.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Budget Range *
                  </Label>
                  <RadioGroup
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                  >
                    {budgets.map((budget) => (
                      <div
                        key={budget.value}
                        className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <RadioGroupItem value={budget.value} id={budget.value} />
                        <Label
                          htmlFor={budget.value}
                          className="flex-1 cursor-pointer"
                        >
                          {budget.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Your Project Estimate</h2>
                <p className="text-muted-foreground">
                  Based on your selections, here's your estimated project cost
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-lg border-2 border-primary/20">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimated Cost
                  </p>
                  <p className="text-5xl font-bold text-primary">
                    ${calculateEstimate().toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold mb-3">Selected Services:</h3>
                    <ul className="space-y-2">
                      {services
                        .filter((s) => formData.services.includes(s.id))
                        .map((service) => (
                          <li
                            key={service.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{service.name}</span>
                            <span className="text-muted-foreground">
                              ${service.basePrice.toLocaleString()}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">Timeline:</span>
                      <span>
                        {timelines.find((t) => t.value === formData.timeline)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Budget Range:</span>
                      <span>
                        {budgets.find((b) => b.value === formData.budget)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/20 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">What's Next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Our team will review your requirements</li>
                  <li>✓ We'll contact you within 24 hours</li>
                  <li>✓ Schedule a free consultation call</li>
                  <li>✓ Receive a detailed project proposal</li>
                </ul>
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit Quote Request
              </Button>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            {step < 4 && (
              <Button onClick={handleNext} className="ml-auto gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
