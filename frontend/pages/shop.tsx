import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { Product } from "../types";
import { ProductCard } from "../components/product-card";
import { LoadingSpinner } from "../components/loading-spinner";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Callout } from "../components/callout";
import { FC, useState } from "react";
import { useDebounce } from "../hooks/use-debounce";

const GET_PRODUCTS = gql`
  query ($searchTerm: String!) {
    products(where: { name: { contains: $searchTerm } }) {
      id
      name
      price
      status
      cover {
        image {
          publicUrl
        }
      }
    }
  }
`;

const Shop: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermDebounced = useDebounce(searchTerm, 300);

  const { loading, error, data } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS,
    {
      variables: {
        searchTerm: searchTermDebounced,
      },
    }
  );

  return (
    <div className="">
      <h2 className="text-5xl font-bold mb-10">Shop</h2>
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
              There was an error loading this page.
            </Callout>
          );

        const { products } = data!;

        if (products.length === 0) {
          return <Callout intent="info">No Games found</Callout>;
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
