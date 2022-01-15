import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import classNames from "classnames";
import { ShoppingCartIcon } from "@heroicons/react/solid";

export const Header = () => {
  return (
    <div className="flex bg-white dark:bg-slate-900 items-center flex-col gap-2 md:flex-row md:gap-2 p-5 sticky top-0 border-b-4 border-indigo-500 z-20 shadow-md">
      <Logo />
      <NavLink href="/shop">Shop</NavLink>
      <NavLink href="/cart">
        <div className="w-5 h-5">
          <ShoppingCartIcon />
        </div>
      </NavLink>
    </div>
  );
};

const NavLink: FC<{ href: string }> = ({ href, children }) => {
  const { asPath } = useRouter();
  const activeClass = "text-indigo-500";

  return (
    <Link href={href}>
      <span
        className={classNames(
          "font-bold cursor-pointer tracking-wider px-4 py-2 rounded-md hover:text-indigo-500",
          asPath === href && activeClass
        )}
      >
        {children}
      </span>
    </Link>
  );
};

const Logo = () => (
  <Link href="/shop">
    <div className="uppercase font-extrabold tracking-tight hover:text-indigo-500 cursor-pointer md:mr-20 transition">
      The Item Shop
    </div>
  </Link>
);
