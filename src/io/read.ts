import * as fs from "fs";
import * as os from "os";

export function readInputFileAsLineArray(path: string) {
  return fs.readFileSync(path).toString().split(os.EOL);
}
