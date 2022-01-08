import { FC } from "react";
import { ProductCardProps } from "../types";
import { toCurrencyString } from "../helpers";
import classNames from "classnames";
import { StockIndicator } from "./stock-indicator";
import { Button } from "./button";

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, cover, status } = product;

  const productImage = (
    <div className="bg-slate-100 aspect-square">
      <img
        src={cover.image.publicUrl}
        className={classNames(
          "object-contain w-full h-full",
          status === "OUT_OF_STOCK" && "saturate-0"
        )}
        alt={cover.altText}
      />
    </div>
  );

  const title = (
    <h3 className="font-extrabold tracking-tight text-3xl">{name}</h3>
  );

  const divider = <div className="w-10 h-1 bg-indigo-500" />;

  const priceTag = (
    <div
      className="bg-indigo-600 text-white font-bold inline-block p-3
         absolute -top-2 -right-2 text-2xl shadow-lg rotate-6"
    >
      {toCurrencyString(price)}
    </div>
  );

  return (
    <div className="bg-white shadow-lg relative">
      {priceTag}
      {productImage}
      <div className="px-5 py-10 flex flex-col gap-5">
        <div>
          <StockIndicator status={status} className="mb-1" />
          {title}
        </div>

        {divider}

        <Button disabled={status === "OUT_OF_STOCK"} className="self-end">
          Add to cart
        </Button>
      </div>
    </div>
  );
};
