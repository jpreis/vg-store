import "../styles/index.css";
import type { AppProps } from "next/app";
import { PageLayout } from "../components/page-layout";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  console.log(client);
  return (
    <ApolloProvider client={client}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ApolloProvider>
  );
}

export default MyApp;
