import { waitForElement } from "@testing-library/react";

import { render, fakeOrder } from "../lib/testUtils";
import OrderList, { USER_ORDERS_QUERY } from "./OrderList";

const fakeOrders = [
  { ...fakeOrder(), id: "1" },
  { ...fakeOrder(), id: "2" },
  fakeOrder()
];

const mocks = [
  {
    request: {
      query: USER_ORDERS_QUERY
    },
    result: {
      data: {
        orders: fakeOrders
      }
    }
  }
];

describe("OrderList", () => {
  it("displays orders", async () => {
    const { getByText, baseElement } = render(<OrderList />, mocks);
    await waitForElement(() => getByText(/You have 3 orders/i));
    expect(baseElement).toMatchSnapshot();
  });
});
