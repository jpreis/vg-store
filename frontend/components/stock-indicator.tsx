import { FC } from "react";
import { StockStatus } from "../types";
import classNames from "classnames";

type Props = {
  status: StockStatus;
  className?: string;
};
export const StockIndicator: FC<Props> = ({ status, className }) => {
  const label = { IN_STOCK: "Available", OUT_OF_STOCK: "Sold out" }[status];

  const classes = classNames(
    "font-bold tracking-wider uppercase text-xs flex items-center gap-2",
    className
  );

  return (
    <div className={classes}>
      <div
        className={classNames("rounded-full bg-current w-2 h-2", {
          "text-green-500": status === "IN_STOCK",
          "text-red-500": status === "OUT_OF_STOCK",
        })}
      />
      {label}
    </div>
  );
};
