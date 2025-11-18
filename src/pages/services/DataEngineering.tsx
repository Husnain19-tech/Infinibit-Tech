import { BarChart, Database, TrendingUp, Brain, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const DataEngineering = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <BarChart className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Data Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Data Engineering & <span className="neon-text">Analytics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Turning raw data into meaningful insights with pipelines and BI dashboards.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Unlock Your Data
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Data <span className="neon-text">Services</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Database, title: "Data Pipelines", desc: "ETL/ELT processes for automated data flow" },
              { icon: BarChart, title: "BI Dashboards", desc: "Interactive visualizations with Tableau & Power BI" },
              { icon: TrendingUp, title: "Predictive Analytics", desc: "ML models for forecasting and insights" },
              { icon: Brain, title: "Data Warehouse", desc: "Centralized data storage and management" },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Tech <span className="neon-text">Stack</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Data Engineering</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Apache Airflow</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Spark & Hadoop</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Python & SQL</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Analytics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Tableau & Power BI</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Looker & Metabase</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Google Analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Storage</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Snowflake & Redshift</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> BigQuery</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Data Lakes (S3)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Service <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Essential Analytics", price: "$8,000", desc: "Basic reporting", features: ["Data Pipeline Setup", "BI Dashboard", "Basic Reports", "Email Support", "Documentation"] },
              { name: "Advanced Analytics", price: "$25,000", desc: "Deep insights", features: ["Complex Pipelines", "Custom Dashboards", "ML Integration", "Priority Support", "Training Sessions", "Ongoing Updates"] },
              { name: "Enterprise Data", price: "Custom", desc: "Full data platform", features: ["Data Warehouse", "Advanced ML Models", "Real-time Analytics", "24/7 Support", "Dedicated Team", "Custom Development"] },
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 ${i === 1 ? 'border-2 border-primary' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold neon-text mb-2">{plan.price}</div>
                <p className="text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/#contact">
                  <Button className="w-full glass-button">Get Started</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Make <span className="neon-text">Data-Driven</span> Decisions</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your data into actionable business intelligence.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Get Data Insights
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default DataEngineering;
