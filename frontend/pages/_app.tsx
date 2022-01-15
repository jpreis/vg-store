import "../styles/index.css";
import type { AppProps } from "next/app";
import { PageLayout } from "../components/page-layout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Head from "next/head";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>The Item Shop</title>
      </Head>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}

export default MyApp;
