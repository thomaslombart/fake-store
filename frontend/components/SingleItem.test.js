import { wait, waitForElement } from "@testing-library/react";

import { render, fakeItem } from "../lib/testUtils";
import SingleItem, { SINGLE_ITEM_QUERY } from "./SingleItem";

const item = fakeItem();
const mocks = [
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
    result: {
      data: {
        item
      }
    }
  }
];

const mocksNoItems = [
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: "123" } },
    result: {
      errors: [{ message: "Items Not Found!" }]
    }
  }
];

describe("SingleItem", () => {
  it("renders with proper data", async () => {
    const { getByText, getByAltText } = render(<SingleItem id="123" />, mocks);
    getByText("Loading...");
    await wait();
    getByText(new RegExp(item.title));
    getByText(item.description);
    getByAltText(item.title);
  });

  it("Errors with a not found item", async () => {
    const { getByText } = render(<SingleItem id="123" />, mocksNoItems);
    await waitForElement(() => getByText("Items Not Found!"));
  });
});
