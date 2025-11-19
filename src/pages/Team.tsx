import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const Team = () => {
  const leadership = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      bio: "15+ years of experience in tech leadership. Previously led engineering teams at Fortune 500 companies. Passionate about building innovative solutions and fostering talent.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      expertise: ["Strategic Planning", "Business Development", "Team Leadership"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@infinibit.tech"
      }
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      bio: "Tech visionary with expertise in AI, cloud architecture, and scalable systems. Led development of multiple award-winning platforms. MIT Computer Science graduate.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      expertise: ["AI/ML", "Cloud Architecture", "System Design"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "michael@infinibit.tech"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Operating Officer",
      bio: "Operations expert with a track record of optimizing processes and scaling businesses. Former consultant at McKinsey. Stanford MBA graduate.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      expertise: ["Operations", "Process Optimization", "Project Management"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@infinibit.tech"
      }
    }
  ];

  const developers = [
    {
      name: "David Park",
      role: "Senior Full-Stack Developer",
      bio: "Full-stack wizard specializing in React, Node.js, and cloud technologies. Built and scaled applications serving millions of users. Open source contributor.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      expertise: ["React", "Node.js", "AWS"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#",
        email: "david@infinibit.tech"
      }
    },
    {
      name: "Priya Sharma",
      role: "Lead AI Engineer",
      bio: "AI specialist focused on NLP and computer vision. Published researcher with patents in machine learning. PhD in Artificial Intelligence from Stanford.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
      expertise: ["Machine Learning", "NLP", "Computer Vision"],
      social: {
        linkedin: "#",
        github: "#",
        email: "priya@infinibit.tech"
      }
    },
    {
      name: "Alex Thompson",
      role: "Senior Mobile Developer",
      bio: "Mobile development expert with 8+ years building iOS and Android apps. Created apps with 10M+ downloads. Passionate about user experience.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      expertise: ["React Native", "iOS", "Android"],
      social: {
        linkedin: "#",
        github: "#",
        email: "alex@infinibit.tech"
      }
    },
    {
      name: "Lisa Wang",
      role: "DevOps Engineer",
      bio: "Infrastructure guru specializing in Kubernetes, CI/CD, and cloud automation. Previously at Google. Ensures our systems run smoothly 24/7.",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop",
      expertise: ["Kubernetes", "Docker", "CI/CD"],
      social: {
        linkedin: "#",
        github: "#",
        email: "lisa@infinibit.tech"
      }
    }
  ];

  const designers = [
    {
      name: "Marcus Williams",
      role: "Lead UI/UX Designer",
      bio: "Design thinking advocate with a passion for creating intuitive, beautiful interfaces. 10+ years experience. Former designer at Apple.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      expertise: ["UI/UX Design", "Design Systems", "User Research"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus@infinibit.tech"
      }
    },
    {
      name: "Sophie Martin",
      role: "Product Designer",
      bio: "Creative problem solver who bridges the gap between user needs and business goals. Award-winning designer with a focus on accessibility.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      expertise: ["Product Design", "Prototyping", "User Testing"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sophie@infinibit.tech"
      }
    }
  ];

  const business = [
    {
      name: "Robert Taylor",
      role: "Business Development Manager",
      bio: "Sales and partnership expert with a consultative approach. Helped grow revenue by 300% in previous role. Master of building lasting relationships.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      expertise: ["Sales", "Partnerships", "Strategy"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "robert@infinibit.tech"
      }
    },
    {
      name: "Jennifer Lee",
      role: "Marketing Director",
      bio: "Digital marketing strategist with expertise in growth hacking and brand building. Led campaigns that generated millions in revenue.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      expertise: ["Digital Marketing", "SEO", "Content Strategy"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "jennifer@infinibit.tech"
      }
    }
  ];

  type TeamMember = {
    name: string;
    role: string;
    bio: string;
    image: string;
    expertise: string[];
    social: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      email?: string;
    };
  };

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="glass-card border-primary/20 hover-scale group overflow-hidden">
      <CardHeader className="text-center">
        <div className="relative mb-4 mx-auto">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
        <CardTitle className="text-xl">{member.name}</CardTitle>
        <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4 text-center">
          {member.bio}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {member.expertise.map((skill, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          {member.social.linkedin && (
            <a 
              href={member.social.linkedin}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {member.social.twitter && (
            <a 
              href={member.social.twitter}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {member.social.github && (
            <a 
              href={member.social.github}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {member.social.email && (
            <a 
              href={`mailto:${member.social.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-fade-in">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            The brilliant minds behind Infinibit Tech. We're a diverse group of innovators, creators, 
            and problem-solvers dedicated to building the future.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visionary leaders guiding our mission to transform businesses through technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Engineering Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              World-class developers building cutting-edge solutions with the latest technologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((member, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Team Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Design Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creative minds crafting beautiful, intuitive experiences that users love
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {designers.map((member, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Business Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic thinkers driving growth and building lasting partnerships
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {business.map((member, idx) => (
              <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Join Our Team?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for talented individuals who are passionate about technology 
            and want to make an impact.
          </p>
          <a 
            href="/careers"
            className="inline-block glass-button bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-all hover-scale"
          >
            View Open Positions
          </a>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Team;
