import { rand } from "./prng";

interface GenerateSvgAvatarOptions {
  size?: number;
  svgNs?: string;
}

const maxColor = parseInt("fff", 16);
const defaultSize = 128;
const defaultSvgNs = "http://www.w3.org/2000/svg";
const minShapes = 2;
const randomShapes = 2; // inclusive, from 2 to 8 shapes total
const minDir = (Math.PI / 2) * 0.1;
const minDist = 0.2;
const maxDist = 0.6;
const minSpreadDist = 0.1;
const colorSpread = 0.15;

export function generateSvgAvatar(
  seed: string,
  options: GenerateSvgAvatarOptions = {}
): SVGSVGElement {
  const svg = document.createElementNS(defaultSvgNs, "svg");
  svg.setAttributeNS(
    null,
    "width",
    options.size?.toString() || defaultSize.toString()
  );
  svg.setAttributeNS(
    null,
    "height",
    options.size?.toString() || defaultSize.toString()
  );
  svg.appendChild(
    generateSvgGAvatar(seed, {
      size: options.size,
      svgNs: options.svgNs || defaultSvgNs,
    })
  );
  return svg;
}

function generateSvgGAvatar(
  seed: string,
  options: GenerateSvgAvatarOptions
): SVGGElement {
  options.size = options.size || defaultSize;
  const g = document.createElementNS(options.svgNs || defaultSvgNs, "g");
  const rect = document.createElementNS(options.svgNs || defaultSvgNs, "rect");
  const random = rand(seed).double;
  const shapes = minShapes + Math.floor(random() * (randomShapes + 1));
  const color = new ColorGen(random);
  rect.setAttributeNS(null, "width", options.size.toString());
  rect.setAttributeNS(null, "height", options.size.toString());
  rect.setAttributeNS(null, "fill", randomColor(random));
  g.appendChild(rect);
  for (let shape = 0; shape < shapes; ++shape) {
    g.appendChild(genShape(random, color, options));
  }
  return g;
}

function genShape(
  random: () => number,
  color: ColorGen,
  options: GenerateSvgAvatarOptions
): SVGPathElement {
  let aX = random() * options.size!;
  let aY = random() * options.size!;
  let bX = random() * options.size!;
  let bY = random() * options.size!;
  let d = distance(aX, aY, bX, bY);
  const dir = Math.atan2(aY - bY, bX - aX);
  if (d < minDist * options.size! || d > maxDist * options.size!) {
    const delta =
      d < minDist * options.size!
        ? (minDist * options.size! - d) / 2
        : (maxDist * options.size! - d) / 2;
    aX += Math.cos(dir + Math.PI) * delta;
    aY -= Math.sin(dir + Math.PI) * delta;
    bX += Math.cos(dir) * delta;
    bY -= Math.sin(dir) * delta;
    d = distance(aX, aY, bX, bY);
  }
  const sAa =
    minSpreadDist * options.size! +
    random() * Math.max(0, d - minSpreadDist * options.size!);
  const sBa =
    minSpreadDist * options.size! +
    random() * Math.max(0, d - minSpreadDist * options.size!);
  const sAb =
    minSpreadDist * options.size! +
    random() * Math.max(0, d - minSpreadDist * options.size!);
  const sBb =
    minSpreadDist * options.size! +
    random() * Math.max(0, d - minSpreadDist * options.size!);
  const dir1a = dir + minDir + (Math.PI - minDir * 2) * random();
  const dir2a = dir + minDir + (Math.PI - minDir * 2) * random();
  const dir1b = dir1a + Math.PI;
  const dir2b = dir2a + Math.PI;
  const path =
    `M ${aX} ${aY} ` +
    `C ${aX + Math.cos(dir1b) * sAb} ${aY - Math.sin(dir1b) * sAb} ` +
    `${bX + Math.cos(dir2b) * sBb} ${bY - Math.sin(dir2b) * sBb} ` +
    `${bX} ${bY} ` +
    `C ${bX + Math.cos(dir2a) * sBa} ${bY - Math.sin(dir2a) * sBa} ` +
    `${aX} ${aY}`;
  const element = document.createElementNS(
    options.svgNs || defaultSvgNs,
    "path"
  );
  element.setAttributeNS(null, "d", path);
  element.setAttributeNS(null, "fill", color.next(random));
  return element;
}

class ColorGen {
  private random: () => number;
  private colors: number[];

  constructor(random: () => number) {
    this.random = random;
    this.colors = [-1, -1, -1];
  }

  next(): string {
    this.colors = this.colors.map((c) =>
      Math.max(
        0,
        Math.min(
          255.999,
          c === -1
            ? this.random() * 256
            : c - colorSpread * 256 + this.random() * (2 * colorSpread * 256)
        )
      )
    );
    return `rgb(${Math.floor(this.colors[0])},${Math.floor(
      this.colors[1]
    )},${Math.floor(this.colors[2])})`;
  }
}

function randomColor(random: () => number): string {
  return `#${Math.floor(random() * maxColor).toString(16)}`;
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
