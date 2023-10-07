import { loadJsonFileSync } from "load-json-file";

const templates = loadJsonFileSync(
  new URL("../../data/temp.json", import.meta.url)
);

export function getTemplates() {
  return templates;
}

export function getTemplateUrlByName(name) {
  const template = templates.find((item) => item.name === name);
  return template ? template.url : undefined;
}
