import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { practiceAreas } from "@/lib/practice-areas";

export default defineTool({
  name: "list_services",
  title: "List compounding services",
  description:
    "List all BioBlend Compounding Pharmacy practice areas (hormone, dermatology, pediatric, pet-wellness, wellness-iv) with slug, title, and tagline.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = practiceAreas.map((p) => ({
      slug: p.slug,
      title: p.title,
      eyebrow: p.eyebrow,
      tagline: p.tagline,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { services: items },
    };
  },
});
