import { useEffect } from "react";
import { COMPANY } from "./data";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  price?: number;
  currency?: string;
  availability?: "in stock" | "out of stock";
}

export function useSEO({
  title,
  description,
  image = "https://helal-enterprise.vercel.app/images/hero-industrial.jpg",
  url = "https://helal-enterprise.vercel.app",
  type = "website",
  price,
  currency = "BDT",
  availability,
}: SEOProps) {
  useEffect(() => {
    // Title
    const fullTitle = `${title} | ${COMPANY.name} — SKF Bearings Dhaka Bangladesh`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Basic SEO
    setMeta("name", "description", description);
    setMeta(
      "name",
      "keywords",
      "SKF bearing Bangladesh, bearing price Dhaka, SKF distributor Bangladesh, deep groove ball bearing, roller bearing Dhaka, industrial bearing Nawabpur, ball bearing 6207 price, spherical roller bearing, tapered roller bearing, pillow block bearing, SKF seal, SKF grease Bangladesh, bearing shop Dhaka, M/S Helal Enterprise, Micro Tools Machineries"
    );
    setMeta("name", "author", "Micro Tools \u0026 Machineries — M/S Helal Enterprise");
    setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
    setMeta("name", "googlebot", "index, follow");
    setMeta("name", "geo.region", "BD-13");
    setMeta("name", "geo.placename", "Dhaka, Bangladesh");
    setMeta("name", "geo.position", "23.7244;90.4134");
    setMeta("name", "ICBM", "23.7244, 90.4134");
    setMeta("name", "theme-color", "#0072C6");
    setMeta("name", "msapplication-TileColor", "#0072C6");

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", "M/S Helal Enterprise — SKF Bearings Bangladesh");
    setMeta("property", "og:locale", "en_BD");

    if (price) {
      setMeta("property", "product:price:amount", String(price));
      setMeta("property", "product:price:currency", currency);
      if (availability) setMeta("property", "product:availability", availability);
    }

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url + window.location.pathname;
  }, [title, description, image, url, type, price, currency, availability]);
}

/** JSON-LD structured data for LocalBusiness */;
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://helal-enterprise.vercel.app/#business",
    name: "M/S Helal Enterprise — Micro Tools \u0026 Machineries",
    description:
      "Authorized SKF distributor in Bangladesh since 1987. Genuine bearings, seals, power transmission and industrial maintenance parts at Nawabpur, Dhaka. Over 200 bearing products in stock.",
    url: "https://helal-enterprise.vercel.app",
    telephone: "+880-1715-078403",
    email: "helalent@gmail.com",
    image: "https://helal-enterprise.vercel.app/images/hero-industrial.jpg",
    logo: "https://helal-enterprise.vercel.app/favicon.svg",
    priceRange: "\u09f3\u09f3",
    address: {
      "@type": "PostalAddress",
      streetAddress: "219-220, Nawabpur Road",
      addressLocality: "Dhaka",
      postalCode: "1100",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.7244,
      longitude: 90.4134,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+880-1715-078403",
        contactType: "sales",
        areaServed: "BD",
      },
      {
        "@type": "ContactPoint",
        telephone: "+880-1772-094911",
        contactType: "customer support",
        areaServed: "BD",
      },
    ],
    brand: [{"@type": "Brand", name: "SKF"}, {"@type": "Brand", name: "Micro Tools \u0026 Machineries"}],
    sameAs: [],
    foundingDate: "1976",
    vatID: "",
    taxID: "",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SKF Bearing Catalogue",
      itemListElement: [
        {"@type": "OfferCatalog", name: "Deep Groove Ball Bearings", itemListElement: []},
        {"@type": "OfferCatalog", name: "Spherical Roller Bearings", itemListElement: []},
        {"@type": "OfferCatalog", name: "Tapered Roller Bearings", itemListElement: []},
        {"@type": "OfferCatalog", name: "Pillow Block Bearing Units", itemListElement: []},
      ],
    },
  };
}
