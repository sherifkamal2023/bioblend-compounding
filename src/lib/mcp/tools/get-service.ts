import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { findPracticeArea, practiceAreas } from "@/lib/practice-areas";

const slugs = practiceAreas.map((p) => p.slug) as [string, ...string[]];

export default defineTool({
  name: "get_service",
  title: "Get service details",
  description:
    "Get full details for one BioBlend practice area, including intro, offerings, and process. Optionally return the Arabic translation.",
  inputSchema: {
    slug: z.enum(slugs).describe("Practice area slug, e.g. 'hormone'."),
    language: z
      .enum(["en", "ar"])
      .optional()
      .describe("Language: 'en' (default) or 'ar' for Arabic."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug, language }) => {
    const area = findPracticeArea(slug);
    if (!area) {
      return { content: [{ type: "text", text: `Unknown slug: ${slug}` }], isError: true };
    }
    const payload =
      language === "ar" && area.ar
        ? { slug: area.slug, ...area.ar }
        : {
            slug: area.slug,
            title: area.title,
            eyebrow: area.eyebrow,
            tagline: area.tagline,
            hero: area.hero,
            intro: area.intro,
            offerings: area.offerings,
            process: area.process,
            note: area.note,
          };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
