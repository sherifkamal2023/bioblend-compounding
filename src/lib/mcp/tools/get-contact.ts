import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact_info",
  title: "Get pharmacy contact info",
  description:
    "Return BioBlend Compounding Pharmacy contact details: phone, email, city, and website.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "BioBlend Compounding Pharmacy",
      phone: "+971-4-3277355",
      email: "hello@bioblendpharmacy.ae",
      city: "Dubai",
      country: "AE",
      website: "https://snug-build-playground.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
