import * as fs from "fs";
import { readInputFileAsLineArray } from "./io/read";

const minesFilePath = process.argv[2];
const cheatSheetFileName = process.argv[3];

const cheatSheetArray = createCheatSheet();

const mines = readInputFileAsLineArray(minesFilePath);

const cheatSheetAsString = convertCheatSheetArrayToString(cheatSheetArray);

writeFile(cheatSheetFileName, cheatSheetAsString);

function writeFile(path: string, content: string) {
  fs.writeFileSync(path, content);
}

function convertCheatSheetArrayToString(cheatSheet: string[][]): string {
  return cheatSheet.map((row) => row.join()).join("\n");
}

function createCheatSheet() {
  const cheatSheet: string[][] = mines.map((line) =>
    line
      .trim()
      .split("")
      .map((field) => (field === "." ? "0" : field))
  );

  cheatSheet.forEach((line, l_index) => {
    line.forEach((field, f_index) => {
      if (isMine(field)) {
        handleMine(cheatSheet, l_index, f_index);
      }
    });
  });
  return cheatSheet;
}

function isMine(field: string) {
  return field === "*";
}

function handleMine(cheatSheet: string[][], x: number, y: number) {
  const neighbourCoordinates = getNeighbourCoordinates(x, y);
  neighbourCoordinates.forEach((coordinate) => {
    if (!exists(cheatSheet, coordinate)) {
      return;
    }
    if (isMine(cheatSheet[coordinate.x][coordinate.y])) {
      return;
    }
    cheatSheet[coordinate.x][coordinate.y] = String(
      +cheatSheet[coordinate.x][coordinate.y] + 1
    );
  });
}

function exists(cheatSheet: string[][], coordinate: { x: number; y: number }) {
  return (
    coordinate.x < cheatSheet.length &&
    coordinate.x >= 0 &&
    coordinate.y < cheatSheet[coordinate.x].length &&
    coordinate.y >= 0
  );
}

function getNeighbourCoordinates(x: number, y: number) {
  return [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x, y: y + 1 },
    { x: x - 1, y: y + 1 },
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x + 1, y: y + 1 },
  ];
}
