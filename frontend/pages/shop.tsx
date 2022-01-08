import { NextPage } from "next";
import { gql, useQuery } from "@apollo/client";
import { Product } from "../types";
import { ProductCard } from "../components/product-card";
import { LoadingSpinner } from "../components/loading-spinner";
import { ExclamationIcon } from "@heroicons/react/outline";

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
      <div className="bg-red-100 p-5 rounded-md flex items-center flex-col w-1/4 mx-auto">
        <ExclamationIcon className="text-red-500 w-10 h-10" />
        There was an error loading this page.
      </div>
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
