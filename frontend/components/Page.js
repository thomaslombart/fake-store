import React from "react";
import Header from "./Header";
import Meta from "./Meta";

const Page = ({ children }) => (
  <div className="py-4 max-w-5xl mx-auto">
    <Meta />
    <Header />
    {children}
  </div>
);

export default Page;
