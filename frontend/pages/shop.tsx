import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { Product } from "../types";
import { ProductCard } from "../components/product-card";
import { LoadingSpinner } from "../components/loading-spinner";
import { ExclamationIcon } from "@heroicons/react/outline";
import { Callout } from "../components/callout";

const GET_PRODUCTS = gql`
  query {
    products {
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
  const { loading, error, data } =
    useQuery<{ products: Product[] }>(GET_PRODUCTS);

  if (loading)
    return (
      <div className="flex justify-center p-10">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <Callout intent="warning">There was an error loading this page.</Callout>
    );

  const { products } = data!;

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">Shop</h2>
      <div className="grid grid-cols-layout gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
