export interface NounSeed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
  oneOfOne?: boolean;
  oneOfOneIndex?: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface NounData {
  parts: EncodedImage[];
  background: string;
}
