import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LaylaHost } from "../components/LaylaHost";
import { Toaster } from "../components/ui/sonner";
import { initI18n, applyLangDir } from "../lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-5xl text-primary">Page not found</h1>
        <div className="mx-auto mt-4 gold-rule" />
        <p className="mt-6 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-primary">This page didn't load</h1>
        <div className="mx-auto mt-4 gold-rule" />
        <p className="mt-6 text-sm text-muted-foreground">
          Something went wrong on our end. Try again or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BioBlend Compounding Pharmacy — Personalized Medicine in Dubai" },
      {
        name: "description",
        content:
          "BioBlend is a luxury compounding pharmacy in Dubai crafting personalized medicines, wellness formulations, and precision therapies. Your Health. Our Blend.",
      },
      { name: "author", content: "BioBlend Compounding Pharmacy" },
      { property: "og:site_name", content: "BioBlend Compounding Pharmacy" },
      {
        property: "og:title",
        content: "BioBlend Compounding Pharmacy — Personalized Medicine in Dubai",
      },
      {
        property: "og:description",
        content:
          "Precision compounding, premium ingredients, and trusted expertise for personalized wellness in Dubai.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ar_AE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BioBlend Compounding Pharmacy" },
      {
        name: "twitter:description",
        content:
          "Personalized compounding and precision wellness pharmacy in Dubai. Your Health. Our Blend.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/bioblend-favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Work+Sans:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Pharmacy",
          name: "BioBlend Compounding Pharmacy",
          alternateName: "صيدلية بايوبلند للتركيبات الدوائية",
          url: "https://bioblendpharmacy.com",
          logo: "https://bioblendpharmacy.com/bioblend-favicon.png",
          description:
            "Precision compounding pharmacy in Dubai — bio-identical HRT, pediatric, dermatology, wellness and pet formulations.",
          telephone: "+971-4-3277355",
          email: "hello@bioblendpharmacy.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressCountry: "AE",
          },
          areaServed: "AE",
          sameAs: [] as string[],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const i = initI18n();
    applyLangDir(i.language);
    const handler = (lng: string) => applyLangDir(lng);
    i.on("languageChanged", handler);
    return () => {
      i.off("languageChanged", handler);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
        <Footer />
        <LaylaHost />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
