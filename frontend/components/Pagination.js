import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import Link from "next/link";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = ({ page }) => {
  const { data, loading } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  const count = data.itemsConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);

  return (
    <div data-testid="pagination">
      <Head>
        <title>
          Sick Fits! — Page {page} of {pages}
        </title>
      </Head>
      <Link
        prefetch
        href={{
          pathname: "items",
          query: { page: page - 1 }
        }}
      >
        <a className="prev" data-testid="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of
        <span data-testid="totalPages" className="totalPages">
          {pages}
        </span>
        !
      </p>
      <p>{count} Items Total</p>
      <Link
        prefetch
        href={{
          pathname: "items",
          query: { page: page + 1 }
        }}
      >
        <a className="next" data-testid="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
