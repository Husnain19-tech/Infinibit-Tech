import { Check } from "lucide-react";

interface Feature {
    title: string;
    description: string;
}

interface InfoCardProps {
    title: string;
    features: Feature[];
    imageUrl?: string;
    imagePosition?: "left" | "right";
    imagePlaceholderIcon?: React.ReactNode;
}

const InfoCard = ({
    title,
    features,
    imageUrl,
    imagePosition = "left",
    imagePlaceholderIcon
}: InfoCardProps) => {
    const imageSection = (
        <div className="relative h-full min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-background">
            {imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    {imagePlaceholderIcon || (
                        <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-16 h-16 text-primary/30" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const contentSection = (
        <div className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                {title.split(' ').map((word, i) => (
                    i === title.split(' ').length - 1 ? (
                        <span key={i} className="neon-text"> {word}</span>
                    ) : (
                        <span key={i}>{word} </span>
                    )
                ))}
            </h2>

            <div className="space-y-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Check className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="glass-card overflow-hidden rounded-3xl">
            <div className="grid md:grid-cols-2 gap-0">
                {imagePosition === "left" ? (
                    <>
                        <div className="order-2 md:order-1">{imageSection}</div>
                        <div className="order-1 md:order-2">{contentSection}</div>
                    </>
                ) : (
                    <>
                        <div className="order-1">{contentSection}</div>
                        <div className="order-2">{imageSection}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoCard;
