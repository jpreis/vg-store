import { FC } from "react";
import classNames from "classnames";

type Props = {
  disabled?: boolean;
  className?: string;
};
export const Button: FC<Props> = ({
  children,
  disabled = false,
  className,
}) => {
  const classes = classNames(
    "uppercase font     py-3 px-6 cursor-pointer transition rounded-full text-sm bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 dark:shadow-indigo-500/30 text-white",
    disabled && "cursor-default opacity-50 pointer-events-none",
    className
  );

  return <div className={classes}>{children}</div>;
};
