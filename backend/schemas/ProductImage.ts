import { list } from "@keystone-6/core";
import { relationship, text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_SECRET ?? "",
  folder: "vg-store",
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: "Source",
    }),
    altText: text(),
    product: relationship({ ref: "Product.cover" }),
  },
  ui: {
    listView: {
      initialColumns: ["image", "altText", "product"],
    },
  },
});
