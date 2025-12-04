import { Helmet } from "react-helmet-async";

interface ServicePageMetaProps {
    title: string;
    description: string;
    serviceName: string;
    keywords?: string[];
    canonicalUrl?: string;
}

const ServicePageMeta = ({
    title,
    description,
    serviceName,
    keywords = [],
    canonicalUrl
}: ServicePageMetaProps) => {
    const defaultKeywords = [
        "Infinibit Tech",
        serviceName,
        "technology solutions",
        "software development",
        "digital transformation"
    ];

    const allKeywords = [...defaultKeywords, ...keywords].join(", ");
    const fullUrl = canonicalUrl || `https://infinibittech.com/services/${serviceName.toLowerCase().replace(/\s+/g, "-")}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={allKeywords} />

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content="Infinibit Tech" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />

            {/* Structured Data - Service Offering */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    "name": serviceName,
                    "description": description,
                    "provider": {
                        "@type": "Organization",
                        "name": "Infinibit Tech",
                        "url": "https://infinibittech.com"
                    },
                    "areaServed": "Worldwide",
                    "hasOfferCatalog": {
                        "@type": "OfferCatalog",
                        "name": `${serviceName} Services`,
                        "itemListElement": [{
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": serviceName
                            }
                        }]
                    }
                })}
            </script>
        </Helmet>
    );
};

export default ServicePageMeta;
