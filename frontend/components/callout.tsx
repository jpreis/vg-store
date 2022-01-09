import { FC } from "react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { Intent } from "../types";
import classNames from "classnames";

type Props = {
  intent?: Intent;
  className?: string;
};

export const Callout: FC<Props> = ({
  intent = "none",
  className,
  children,
}) => {
  const colorClasses = {
    warning: "border-amber-500 bg-amber-500/20 text-amber-500",
    danger: "border-red-500 bg-red-500/20 text-red-500",
    success: "border-green-500 bg-green-500/20 text-green-500",
    info: "border-blue-500 bg-blue-500/20 text-blue-500",
    none: "border-current text-current-500",
  }[intent];

  const Icon = {
    warning: ExclamationCircleIcon,
    danger: ExclamationIcon,
    success: CheckCircleIcon,
    info: InformationCircleIcon,
    none: InformationCircleIcon,
  }[intent];

  return (
    <div
      className={classNames(
        "border px-3 py-3 rounded-md flex gap-3 items-center",
        colorClasses,
        className
      )}
    >
      <Icon className="text-current w-8 h-8" />
      {children}
    </div>
  );
};
