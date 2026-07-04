import { defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import getServiceTool from "./tools/get-service";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "bioblend-mcp",
  title: "BioBlend Compounding Pharmacy",
  version: "0.1.0",
  instructions:
    "Read-only tools for BioBlend Compounding Pharmacy (Dubai). Use `list_services` to enumerate practice areas, `get_service` for full details (English or Arabic), and `get_contact_info` for pharmacy contact details.",
  tools: [listServicesTool, getServiceTool, getContactTool],
});
