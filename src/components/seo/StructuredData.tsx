import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
}

export const OrganizationSchema = ({
  name = "Infinibit Tech",
  description = "AI-Powered Innovation Studio providing enterprise-grade digital solutions",
  url = "https://infinibit.tech",
  logo = "https://infinibit.tech/logo.jpg",
  sameAs = [],
  contactPoint,
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url,
    logo,
    sameAs,
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        ...contactPoint,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string;
  url?: string;
}

export const ServiceSchema = ({
  name,
  description,
  provider = "Infinibit Tech",
  serviceType = "IT Services",
  areaServed = "Worldwide",
  url,
}: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: provider,
    },
    serviceType,
    areaServed,
    ...(url && { url }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  searchUrl?: string;
}

export const WebsiteSchema = ({
  name = "Infinibit Tech",
  url = "https://infinibit.tech",
  description = "AI-Powered Innovation Studio",
  searchUrl,
}: WebsiteSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    ...(searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: `${searchUrl}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  email?: string;
  priceRange?: string;
  openingHours?: string[];
}

export const LocalBusinessSchema = ({
  name = "Infinibit Tech",
  description = "AI-Powered Software Development Company",
  address,
  geo,
  telephone,
  email,
  priceRange = "$$$",
  openingHours,
}: LocalBusinessSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    description,
    priceRange,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    ...(geo && {
      geo: {
        "@type": "GeoCoordinates",
        ...geo,
      },
    }),
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(openingHours && { openingHoursSpecification: openingHours }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
