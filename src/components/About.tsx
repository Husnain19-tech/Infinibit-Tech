import { Target, Eye, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/services/business-consultancy-2.jpg"
          alt="Office Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-dark-surface" />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <span className="text-sm text-primary">About Infinibit Tech</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Building the <span className="neon-text">Future</span>
            </h2>
          </div>

          {/* Main content */}
          <div className="glass-card p-8 md:p-12 mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Infinibit Tech is a next-generation software innovation studio providing AI-powered,
              enterprise-grade digital solutions. We specialize in automation, AI engineering,
              web & mobile development, enterprise systems, and digital transformation for global businesses.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded by <span className="text-primary font-semibold">Husnain Shabbir</span> & <span className="text-primary font-semibold">Rafay Butt</span>,
              the company is built on the vision of merging technology + intelligence + creativity
              into scalable, future-proof digital products.
            </p>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with intelligent digital solutions that automate operations,
                accelerate growth, and deliver exceptional customer experiences.
              </p>
            </div>

            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become Pakistan's most trusted global technology partner — building products
                that transform industries through AI, data, and innovation.
              </p>
            </div>

            <div className="glass-card p-8 hover:scale-105 transition-transform">
              <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Values</h3>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Innovation First</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Precision Engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Client Partnership</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Transparency</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Excellence</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="mt-16 glass-card p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Measurable Business Outcomes</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                "Cost Reduction",
                "Operational Automation",
                "Revenue Growth",
                "Customer Experience",
                "Digital Transformation"
              ].map((outcome, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary text-xl font-bold">✓</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
