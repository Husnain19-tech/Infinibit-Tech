import { Code2 } from "lucide-react";

interface TechCategory {
    category: string;
    technologies: string[];
}

interface TechStackCardProps {
    title?: string;
    techStack: TechCategory[];
    imageUrl?: string;
    imagePosition?: "left" | "right";
}

const TechStackCard = ({
    title = "Tech Stack",
    techStack,
    imageUrl,
    imagePosition = "right"
}: TechStackCardProps) => {
    const imageSection = (
        <div className="relative h-full w-full min-h-[250px] overflow-hidden bg-gradient-to-br from-primary/20 to-background">
            {imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt="Technology Stack"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="relative">
                        {/* Animated background circles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full bg-primary/10 animate-pulse" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
                        </div>
                        <Code2 className="relative w-16 h-16 text-primary z-10" />
                    </div>
                </div>
            )}
        </div>
    );

    const contentSection = (
        <div className="flex flex-col justify-center p-6 md:p-8 h-full w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {title.split(' ').slice(0, -1).join(' ')} <span className="neon-text">{title.split(' ').slice(-1)}</span>
            </h2>

            <div className="space-y-5">
                {techStack.map((category, index) => (
                    <div key={index} className="space-y-3">
                        <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            {category.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.technologies.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-4 py-2 rounded-lg bg-primary/10 text-sm font-medium text-foreground hover:bg-primary/20 hover:scale-105 transition-all duration-300 cursor-default border border-primary/20"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="glass-card overflow-hidden rounded-3xl">
            <div className="grid md:grid-cols-2 gap-0 items-stretch">
                {imagePosition === "left" ? (
                    <>
                        <div className="order-2 md:order-1 h-full w-full">{imageSection}</div>
                        <div className="order-1 md:order-2 h-full w-full">{contentSection}</div>
                    </>
                ) : (
                    <>
                        <div className="order-1 h-full w-full">{contentSection}</div>
                        <div className="order-2 h-full w-full">{imageSection}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TechStackCard;
