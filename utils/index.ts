// Utils for the Coreledger website

// In Next.js, we use standard routes, so we can simplify this
export function createPageUrl(pageName: string): string {
  const routes: Record<string, string> = {
    "Home": "/",
    "Contextus": "/contextus",
    "Podcast": "/podcast", 
    "Lab": "/lab",
    "Careers": "/careers",
    "Contact": "/contact"
  };
  
  return routes[pageName] || "/";
}
