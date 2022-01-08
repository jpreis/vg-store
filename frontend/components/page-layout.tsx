import { FC } from "react";
import { Header } from "./header";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="container mx-auto px-4 py-24 overflow-scroll h-full">
        {children}
      </div>
      <div className="bg-indigo-900 text-white px-5 py-10">
        &copy; {new Date().getUTCFullYear()} The Item Shop
      </div>
    </div>
  );
};
