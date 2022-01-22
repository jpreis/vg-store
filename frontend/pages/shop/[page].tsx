import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_QUERY } from "../../queries";
import { Product } from "../../types";
import { useDebounce } from "../../hooks/use-debounce";
import { useState } from "react";
import { PageHeading } from "../../components/page-heading";
import { LoadingSpinner } from "../../components/loading-spinner";
import { Callout } from "../../components/callout";
import { Pagination } from "../../components/pagination";
import { ProductCard } from "../../components/product-card";
import { useRouter } from "next/router";

const ITEMS_PER_PAGE = 4;

const Shop: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermDebounced = useDebounce(searchTerm.trim(), 300);

  const { query } = useRouter();
  const maybePage = parseInt(query.page as string);
  const currentPage = Math.max(1, isNaN(maybePage) ? 1 : maybePage);

  const { loading, error, data } = useQuery<{
    products: Product[];
    productsCount: number;
  }>(GET_PRODUCTS_QUERY, {
    variables: {
      searchTerm: searchTermDebounced,
      skip:
        searchTermDebounced === ""
          ? ITEMS_PER_PAGE * currentPage - ITEMS_PER_PAGE
          : undefined,
      take: searchTermDebounced === "" ? ITEMS_PER_PAGE : undefined,
    },
  });

  return (
    <div>
      <PageHeading>Shop</PageHeading>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search..."
        className="bg-transparent border-2 border-indigo-500 rounded-full mb-10 px-4 py-2 text-xl
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

        const { products, productsCount } = data!;

        if (products.length === 0) {
          return <Callout intent="info">No items found</Callout>;
        }

        const pagination = (
          <div className="py-10 flex justify-center">
            {searchTermDebounced === "" ? (
              <Pagination
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={productsCount}
              />
            ) : (
              <div className={"p-1"}>{products.length} results</div>
            )}
          </div>
        );

        return (
          <>
            {pagination}

            <div className="grid grid-cols-layout gap-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {pagination}
          </>
        );
      })()}
    </div>
  );
};

export default Shop;
