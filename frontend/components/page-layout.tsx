import { FC } from "react";
import { Header } from "./header";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-24 overflow-scroll h-full">
        {children}
      </div>
      <div className="bg-indigo-900 text-white p-5">foo</div>
    </div>
  );
};
