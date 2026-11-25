export interface SizedPhoto {
  url: string;
  width?: number | null;
  height?: number | null;
}

// Google Shopping disapproves an offer whose main photo is under 500×500.
const MIN_SIDE = 500;

const tooSmall = ({ width, height }: SizedPhoto) => width != null && height != null && Math.min(width, height) < MIN_SIDE;

/** The photos with the first one Google accepts as the main photo moved to the front; the rest keep their order. */
export function leadWithLargePhoto<T extends SizedPhoto>(images: T[]): T[] {
  const index = images.findIndex((image) => !tooSmall(image));
  if (index <= 0) return images;
  return [images[index], ...images.slice(0, index), ...images.slice(index + 1)];
}
