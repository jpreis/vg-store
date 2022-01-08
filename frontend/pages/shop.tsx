import { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
    }
  }
`;

const Shop: NextPage = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  return (
    <div>
      <h2 className="text-4xl font-bold">Shop</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Shop;
