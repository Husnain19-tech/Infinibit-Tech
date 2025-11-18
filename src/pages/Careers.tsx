import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap, Trophy, MapPin, Clock, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Careers = () => {
  const { toast } = useToast();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    resume: "",
    coverLetter: "",
  });

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
    },
    {
      icon: Zap,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and generous paid time off",
    },
    {
      icon: Trophy,
      title: "Growth Opportunities",
      description: "Continuous learning, certifications, and career advancement programs",
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment, team events, and inclusive workplace",
    },
  ];

  const jobs = [
    {
      id: "1",
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead development of cutting-edge web applications using React, Node.js, and cloud technologies.",
      requirements: [
        "5+ years of full-stack development experience",
        "Expert in React, TypeScript, and Node.js",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Strong understanding of software architecture",
        "Excellent problem-solving and communication skills",
      ],
      responsibilities: [
        "Design and develop scalable web applications",
        "Lead technical discussions and code reviews",
        "Mentor junior developers",
        "Collaborate with cross-functional teams",
      ],
    },
    {
      id: "2",
      title: "AI/ML Engineer",
      department: "AI & Innovation",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Build and deploy machine learning models to solve real-world business problems.",
      requirements: [
        "3+ years of experience in ML/AI development",
        "Strong Python programming skills",
        "Experience with TensorFlow, PyTorch, or similar",
        "Understanding of NLP and computer vision",
        "Experience deploying ML models to production",
      ],
      responsibilities: [
        "Develop and train machine learning models",
        "Optimize model performance and accuracy",
        "Implement AI solutions for clients",
        "Research and implement cutting-edge AI techniques",
      ],
    },
    {
      id: "3",
      title: "UI/UX Designer",
      department: "Design",
      location: "Hybrid",
      type: "Full-time",
      experience: "3+ years",
      description: "Create beautiful, intuitive user experiences for web and mobile applications.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma, Adobe XD, or Sketch",
        "Strong portfolio showcasing design work",
        "Understanding of design systems and principles",
        "Experience with user research and testing",
      ],
      responsibilities: [
        "Design user interfaces for web and mobile apps",
        "Conduct user research and usability testing",
        "Create and maintain design systems",
        "Collaborate with developers and stakeholders",
      ],
    },
    {
      id: "4",
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build and maintain robust CI/CD pipelines and cloud infrastructure.",
      requirements: [
        "4+ years of DevOps experience",
        "Expert in Docker, Kubernetes, and CI/CD",
        "Strong scripting skills (Bash, Python)",
        "Experience with AWS, Azure, or GCP",
        "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      ],
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure and deployments",
        "Ensure system reliability and security",
        "Automate operational processes",
      ],
    },
    {
      id: "5",
      title: "Business Development Manager",
      department: "Sales",
      location: "Hybrid",
      type: "Full-time",
      experience: "5+ years",
      description: "Drive business growth by identifying opportunities and building client relationships.",
      requirements: [
        "5+ years of B2B sales experience",
        "Strong understanding of IT services",
        "Proven track record of meeting sales targets",
        "Excellent communication and negotiation skills",
        "Experience with CRM systems",
      ],
      responsibilities: [
        "Identify and pursue new business opportunities",
        "Build and maintain client relationships",
        "Develop and execute sales strategies",
        "Collaborate with delivery teams",
      ],
    },
    {
      id: "6",
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      description: "Execute digital marketing campaigns to drive brand awareness and lead generation.",
      requirements: [
        "2+ years of digital marketing experience",
        "Proficiency in SEO, SEM, and social media marketing",
        "Experience with Google Analytics and marketing tools",
        "Strong content creation skills",
        "Data-driven approach to marketing",
      ],
      responsibilities: [
        "Plan and execute digital marketing campaigns",
        "Manage social media presence",
        "Optimize website for SEO and conversions",
        "Analyze campaign performance and ROI",
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: selectedJob || "",
      resume: "",
      coverLetter: "",
    });
    setSelectedJob(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Build the future of technology with a team that values innovation, collaboration, and growth
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Culture</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Innovation First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We encourage creative thinking and provide resources for experimentation. Your ideas matter, and we support turning them into reality.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Continuous Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access to courses, conferences, and certifications. We invest in your growth because your success is our success.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Work-Life Harmony</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Flexible schedules, remote work options, and a culture that respects personal time. We believe happy employees create better products.
                </p>
              </CardContent>
            </Card>
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>Diverse & Inclusive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We celebrate diversity and foster an inclusive environment where everyone feels valued and empowered to contribute.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass-card border-primary/20 text-center">
                <CardHeader>
                  <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid gap-6 mb-12">
            {jobs.map((job) => (
              <Card key={job.id} className="glass-card border-primary/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                      <CardDescription className="text-base">{job.description}</CardDescription>
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedJob(job.id);
                        setFormData({ ...formData, position: job.title });
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="whitespace-nowrap"
                    >
                      Apply Now
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {job.department}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="outline">{job.experience}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Responsibilities:</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Apply Now</h2>
          <p className="text-center text-muted-foreground mb-12">
            {selectedJob 
              ? `Applying for: ${jobs.find(j => j.id === selectedJob)?.title}`
              : "Fill out the form below to start your journey with us"
            }
          </p>
          <Card className="glass-card border-primary/20">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-2">
                    Position Applying For *
                  </label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Senior Full-Stack Developer"
                  />
                </div>
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium mb-2">
                    Resume/CV Link *
                  </label>
                  <Input
                    id="resume"
                    name="resume"
                    type="url"
                    value={formData.resume}
                    onChange={handleInputChange}
                    required
                    placeholder="https://drive.google.com/your-resume"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Please provide a link to your resume (Google Drive, Dropbox, etc.)
                  </p>
                </div>
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium mb-2">
                    Cover Letter
                  </label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Tell us why you'd be a great fit for this role..."
                    rows={6}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Careers;
