import {
    Code2, Database, Globe, Smartphone, Cloud,
    Cpu, Shield, Zap, Layers, Box
} from "lucide-react";

const technologies = [
    { name: "React", icon: Code2 },
    { name: "Node.js", icon: Database },
    { name: "TypeScript", icon: Code2 },
    { name: "Next.js", icon: Globe },
    { name: "Flutter", icon: Smartphone },
    { name: "AWS", icon: Cloud },
    { name: "Python", icon: Code2 },
    { name: "TensorFlow", icon: Cpu },
    { name: "Docker", icon: Box },
    { name: "Kubernetes", icon: Layers },
    { name: "GraphQL", icon: Zap },
    { name: "MongoDB", icon: Database },
];

const TechStack = () => {
    return (
        <section className="py-20 bg-dark-surface relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        Powered by <span className="neon-text">Modern Tech</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We leverage the latest frameworks and tools to build scalable, high-performance solutions.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <tech.icon className="w-6 h-6 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
