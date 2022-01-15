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

  const { name } = data.product;

  return (
    <div>
      <Head>
        <title>{name} - The Item Shop</title>
      </Head>
      <PageHeading>{name}</PageHeading>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export default ProductDetails;
