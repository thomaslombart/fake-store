import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Item from "./Item";
import Pagination from "./Pagination";
import Search from "./Search";

import { perPage } from "../config";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Items = ({ page }) => {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * perPage - perPage
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Search />
      <Pagination page={page} />
      <div>
        {data.items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </div>
      <Pagination page={page} />
    </div>
  );
};

export default Items;
export { ALL_ITEMS_QUERY };
