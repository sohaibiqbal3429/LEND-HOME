import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lendly.uk";
  const routes = [
    "",
    "/mortgages",
    "/business-finance",
    "/calculator",
    "/learn",
    "/contact",
    "/privacy",
    "/terms",
    "/accessibility",
    "/status"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
