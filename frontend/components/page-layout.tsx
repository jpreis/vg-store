import { FC } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const PageLayout: FC = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-scroll">
      <Header />
      <div className=" px-4 py-24 ">
        <div className="mx-auto container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};
