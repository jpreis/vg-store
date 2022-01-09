import { FC } from "react";
import { ProductCardProps } from "../types";
import { toCurrencyString } from "../helpers";
import classNames from "classnames";
import { StockIndicator } from "./stock-indicator";
import { Button } from "./button";
import Link from "next/link";

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, cover, status } = product;

  const productImage = (
    <div className="bg-slate-100 dark:bg-slate-700 aspect-square">
      {cover && (
        <img
          src={cover.image.publicUrl}
          className={classNames(
            "object-contain w-full h-full",
            status === "OUT_OF_STOCK" && "saturate-0"
          )}
          alt={cover.altText}
        />
      )}
    </div>
  );

  const title = (
    <h3 className="font-extrabold tracking-tight text-3xl">{name}</h3>
  );

  const divider = <div className="w-10 h-1 bg-indigo-500" />;

  const priceTag = (
    <div
      className="bg-indigo-600 text-white font-bold inline-block py-3 px-5 z-10 rounded-md rotate-6
         absolute -top-2 -right-2 text-2xl shadow-md shadow-black/20 bg-gradient-to-br from-red-500 to-red-700
         border-t-[1px] border-t-red-100/50 border-b-[1px] border-b-red-900"
    >
      {toCurrencyString(price)}
    </div>
  );

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white dark:bg-slate-800 shadow-lg relative flex flex-col cursor-pointer">
        {priceTag}
        <div>{productImage}</div>
        <div className="px-5 py-10 flex flex-col gap-5 h-full">
          <div>
            <StockIndicator status={status} className="mb-1" />
            {title}
          </div>

          {divider}

          <Button
            disabled={status === "OUT_OF_STOCK"}
            className="self-end mt-auto"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Link>
  );
};
