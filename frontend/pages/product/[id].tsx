import { NextPage } from "next";
import { PageHeading } from "../../components/page-heading";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { Product } from "../../types";
import { GET_PRODUCT_QUERY } from "../../queries";
import { LoadingSpinner } from "../../components/loading-spinner";
import { useEffect } from "react";
import { Callout } from "../../components/callout";
import Head from "next/head";
import Image from "next/image";
import classNames from "classnames";

const ProductDetails: NextPage = () => {
  const { query, isReady } = useRouter();

  const [fetchProduct, { data, loading, error }] = useLazyQuery<{
    product: Product;
  }>(GET_PRODUCT_QUERY);

  useEffect(() => {
    void fetchProduct({ variables: { id: query.id } });
  }, [isReady]);

  if (loading || !data) {
    return (
      <div className="flex justify-center p-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <Callout intent="warning">There was an error loading this page</Callout>
    );
  }

  if (data.product === null) {
    return <Callout intent="info">The specified product was not found</Callout>;
  }

  const { name, cover, description } = data.product;

  return (
    <div>
      <Head>
        <title>{name} - The Item Shop</title>
      </Head>
      <PageHeading>{name}</PageHeading>
      <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-[auto,1fr] md:items-start">
        {!!cover && (
          <div className="relative">
            <img
              src={cover.image.publicUrl}
              alt={cover.altText}
              className="overflow-hidden rounded-md shadow-lg"
            />
            <div
              className={classNames(
                "block w-full absolute left-0 top-0 bg-gradient-to-bl via-transparent from-white/75 h-3/4"
              )}
            />
          </div>
        )}
        <p className="max-w-prose text-xl">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
