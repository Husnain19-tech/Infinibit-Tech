import { Users, CheckCircle, Trophy, Globe } from "lucide-react";

const stats = [
    { label: "Projects Delivered", value: "50+", icon: CheckCircle },
    { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Years Experience", value: "15+", icon: Trophy },
    { label: "Global Reach", value: "10+", icon: Globe },
];

const Stats = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/services/corporate-solutions-2.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-background/90" />
            </div>

            <div className="container relative z-10 mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="text-4xl font-bold neon-text mb-2">{stat.value}</div>
                            <div className="text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
