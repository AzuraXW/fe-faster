import { loadJsonFileSync } from "load-json-file";

const pkg = loadJsonFileSync(new URL("../../package.json", import.meta.url));

export default pkg;
