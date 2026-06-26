// schema.js — JSON-LD RealEstateAgent schema builder

export function injectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Elite Integrity Property Solutions",
    "url": "https://eliteintegrityproperty.com",
    "logo": "https://eliteintegrityproperty.com/logo.png",
    "image": "https://eliteintegrityproperty.com/og-image.jpg",
    "description": "We buy houses fast for cash in any condition. No repairs, no fees, no commissions. Get your fair cash offer in as little as 7 days.",
    "telephone": "(559) 734-7472",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "Free Consultation",
    "sameAs": [],
    "knowsAbout": [
      "Real estate investing",
      "Cash home buying",
      "Foreclosure assistance",
      "Probate real estate",
      "Off-market home sales"
    ]
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
