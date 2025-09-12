declare module 'dom-to-image-more' {
  interface Options {
    quality?: number;
    bgcolor?: string | null;
    cacheBust?: boolean;
    imagePlaceholder?: string | undefined;
    style?: { [key: string]: string };
    filter?: (node: Node) => boolean;
    width?: number;
    height?: number;
    scale?: number;
  }

  export function toPng(node: Node, options?: Options): Promise<string>;
  export function toJpeg(node: Node, options?: Options): Promise<string>;
  export function toSvg(node: Node, options?: Options): Promise<string>;
  export function toBlob(node: Node, options?: Options): Promise<Blob>;
  export function toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
}
