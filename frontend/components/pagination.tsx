import { FC } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import Link from "next/link";
import * as React from "react";
import classNames from "classnames";

type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};

export const Pagination: FC<Props> = ({
  currentPage,
  itemsPerPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center gap-5">
      <IconLink
        href={`/shop/${currentPage - 1}`}
        isDisabled={currentPage === 1}
      >
        <ArrowLeftIcon />
      </IconLink>
      Page {currentPage} of {totalPages}
      <IconLink
        href={`/shop/${currentPage + 1}`}
        isDisabled={currentPage === totalPages}
      >
        <ArrowRightIcon />
      </IconLink>
    </div>
  );
};

const IconLink: FC<{ href: string; isDisabled?: boolean }> = ({
  href,
  isDisabled = false,
  children,
}) => (
  <Link href={href}>
    <a
      className={classNames(
        "p-1 w-8 h-8 block rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition",
        isDisabled && "pointer-events-none opacity-50"
      )}
    >
      {children}
    </a>
  </Link>
);
