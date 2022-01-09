import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { Product } from "../types";
import { ProductCard } from "../components/product-card";
import { LoadingSpinner } from "../components/loading-spinner";
import { Callout } from "../components/callout";
import { useState } from "react";
import { useDebounce } from "../hooks/use-debounce";
import { PageHeading } from "../components/page-heading";
import { GET_PRODUCTS_QUERY } from "../queries";
import Link from "next/link";

const Shop: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermDebounced = useDebounce(searchTerm, 300);

  const { loading, error, data } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS_QUERY,
    {
      variables: {
        searchTerm: searchTermDebounced,
      },
    }
  );

  return (
    <div>
      <PageHeading>Shop</PageHeading>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search..."
        className="bg-transparent border-2 border-indigo-500 rounded-full mb-20 px-4 py-2 text-xl
        focus:outline-none focus:ring-1 focus:ring-indigo-500 block mx-auto"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {(() => {
        if (loading)
          return (
            <div className="flex justify-center p-10">
              <LoadingSpinner />
            </div>
          );

        if (error)
          return (
            <Callout intent="warning">
              There was an error loading this page
            </Callout>
          );

        const { products } = data!;

        if (products.length === 0) {
          return <Callout intent="info">No items found</Callout>;
        }

        return (
          <div className="grid grid-cols-layout gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default Shop;
