import { wait, prettyDOM } from "@testing-library/react";
import { render, fakeItem, secondFakeItem } from "../lib/testUtils";
import Router from "next/router";

import Items, { ALL_ITEMS_QUERY } from "./Items";
import { PAGINATION_QUERY } from "./Pagination";

Router.router = {
  push() {},
  prefetch() {}
};

const mocks = [
  {
    request: { query: ALL_ITEMS_QUERY, variables: { skip: 0, first: 4 } },
    result: { data: { items: [fakeItem(), secondFakeItem()] } }
  },
  {
    request: { query: PAGINATION_QUERY },
    result: {
      data: {
        itemsConnection: {
          __typename: "aggregate",
          aggregate: {
            count: 4,
            __typename: "count"
          }
        }
      }
    }
  }
];

describe("<Items/>", () => {
  it("Shows an item list", async () => {
    const { getAllByText, getByText } = render(<Items page={1} />, mocks);
    getAllByText("Loading...");
    await wait();
    getByText("dogs are best");
    getByText("cats are best");
  });
});
