import { waitForElement } from "@testing-library/react";
import { render, fakeOrder } from "../lib/testUtils";

import Order, { SINGLE_ORDER_QUERY } from "./Order";

const order = fakeOrder();

const mocks = [
  {
    request: { query: SINGLE_ORDER_QUERY, variables: { id: "ord123" } },
    result: { data: { order } }
  }
];

describe("Order", () => {
  it("displays a loading messages", () => {
    const { getByText } = render(<Order id="ord123" />, mocks);

    getByText("Loading...");
  });

  it("displays the order and associated items", async () => {
    const { getByText, queryAllByTestId } = render(
      <Order id="ord123" />,
      mocks
    );

    await waitForElement(() => getByText("ord123"));
    const orderItems = queryAllByTestId("order-item");
    expect(orderItems.length).toBe(order.items.length);
  });
});
