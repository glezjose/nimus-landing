export const PRODUCT_CATALOG_IMAGES = {
  smartlink: [
    "/assets/keychains/1.jpeg",
    "/assets/keychains/2.jpeg",
    "/assets/keychains/3.jpeg",
    "/assets/keychains/4.jpeg",
  ],
  fidget: [
    "/assets/smartlink/1.jpeg",
    "/assets/smartlink/2.jpeg",
  ],
  personalizada: [
    "/assets/custom/1.jpeg",
    "/assets/custom/2.jpeg",
  ],
} as const;

export type ProductCatalogImageId = keyof typeof PRODUCT_CATALOG_IMAGES;

export function getProductCatalogImages(productId: string): readonly string[] {
  if (productId in PRODUCT_CATALOG_IMAGES) {
    return PRODUCT_CATALOG_IMAGES[productId as ProductCatalogImageId];
  }
  return [];
}
