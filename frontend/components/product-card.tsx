import { FC } from "react";
import { ProductCardProps } from "../types";
import { toCurrencyString } from "../helpers";
import classNames from "classnames";
import { StockIndicator } from "./stock-indicator";
import { Button } from "./button";
import Link from "next/link";
import { useHover } from "../hooks/user-hover";

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, cover, status } = product;
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  const productImage = (
    <div className="bg-slate-100 dark:bg-slate-700 relative rounded-tl-md overflow-hidden">
      {cover && (
        <div>
          <img
            src={cover.image.publicUrl}
            className={classNames(
              "object-contain w-full h-full relative",
              status === "OUT_OF_STOCK" && " opacity-25"
            )}
            alt={cover.altText}
          />
          <div
            className={classNames(
              "block w-full transition-[height] duration-300 absolute left-0 top-0 bg-gradient-to-bl via-transparent from-white/75",
              isHovered ? "h-3/4" : "h-1/2"
            )}
          />
        </div>
      )}
    </div>
  );

  const title = (
    <h3 className="font-extrabold tracking-tight text-3xl">{name}</h3>
  );

  const divider = <div className="w-10 h-1 bg-indigo-500" />;

  const priceTag = (
    <div
      className="bg-indigo-600 text-white font-bold inline-block py-3 px-5 z-10 rounded-sm rotate-6
         absolute -top-2 -right-2 text-2xl shadow-md shadow-black/20 bg-gradient-to-br from-red-400 to-red-600"
    >
      {toCurrencyString(price)}
    </div>
  );

  return (
    <div
      ref={hoverRef}
      className={classNames(
        "bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl relative flex flex-col rounded-md transition duration-300"
      )}
    >
      {priceTag}

      <div>{productImage}</div>
      <div className="px-5 py-10 flex flex-col gap-5 h-full">
        <div>
          <StockIndicator status={status} className="mb-1" />
          {title}
        </div>

        {divider}
        <div className="self-end flex gap-5 mt-auto items-center">
          <Link href={`/product/${id}`}>
            <span className="uppercase cursor-pointer text-sm text-indigo-400 hover:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-300 transition">
              Details
            </span>
          </Link>
          <Button disabled={status === "OUT_OF_STOCK"}>Add to cart</Button>
        </div>
      </div>
    </div>
  );
};
