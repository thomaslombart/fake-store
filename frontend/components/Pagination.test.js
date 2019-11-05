import { wait } from "@testing-library/react";
import Router from "next/router";

import { render } from "../lib/testUtils";
import Pagination, { PAGINATION_QUERY } from "./Pagination";

Router.router = {
  push() {},
  prefetch() {}
};

function makeMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          itemsConnection: {
            __typename: "aggregate",
            aggregate: {
              count: length,
              __typename: "count"
            }
          }
        }
      }
    }
  ];
}

describe("<Pagination/>", () => {
  it("displays a loading message", () => {
    const { getByText } = render(<Pagination page={1} />, makeMocksFor(1));
    getByText("Loading...");
  });

  it("renders pagination for 18 items", async () => {
    const { getByTestId, getByText } = render(
      <Pagination page={1} />,
      makeMocksFor(18)
    );
    await wait();
    expect(getByTestId("totalPages")).toHaveTextContent("5");
    getByText("18 Items Total");
    expect(getByTestId("next").getAttribute("aria-disabled")).toBe("false");
  });

  it("disables prev button on first page", async () => {
    const { getByTestId } = render(<Pagination page={1} />, makeMocksFor(18));
    await wait();
    expect(getByTestId("prev").getAttribute("aria-disabled")).toBe("true");
    expect(getByTestId("next").getAttribute("aria-disabled")).toBe("false");
  });

  it("disables next button on last page", async () => {
    const { getByTestId } = render(<Pagination page={5} />, makeMocksFor(18));
    await wait();
    expect(getByTestId("prev").getAttribute("aria-disabled")).toBe("false");
    expect(getByTestId("next").getAttribute("aria-disabled")).toBe("true");
  });

  it("enables all buttons on a middle page", async () => {
    const { getByTestId } = render(<Pagination page={2} />, makeMocksFor(18));
    await wait();
    expect(getByTestId("prev").getAttribute("aria-disabled")).toBe("false");
    expect(getByTestId("next").getAttribute("aria-disabled")).toBe("false");
  });
});
