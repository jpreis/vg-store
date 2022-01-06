import { list } from "@keystone-6/core";
import { integer, relationship, select, text } from "@keystone-6/core/fields";

export const Product = list({
  // TODO: access
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    cover: relationship({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: {
          fields: ["image", "altText"],
        },
        inlineEdit: {
          fields: ["image", "altText"],
        },
      },
    }),
    status: select({
      ui: {
        displayMode: "segmented-control",
        createView: {
          fieldMode: "hidden",
        },
      },
      options: [
        {
          label: "In Stock",
          value: "IN_STOCK",
        },
        {
          label: "Out of Stock",
          value: "OUT_OF_STOCK",
        },
      ],
      defaultValue: "IN_STOCK",
    }),
    price: integer(),
    // TODO: photo
  },
});
