import { wait } from "@testing-library/react";

import Cart, { LOCAL_STATE_QUERY } from "./Cart";
import { CURRENT_USER_QUERY } from "./User";
import { render, fakeUser, fakeCartItem } from "../lib/testUtils";

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()]
        }
      }
    }
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: { data: { cartOpen: true } }
  }
];

describe("<Cart/>", () => {
  it.skip("renders and matches snappy", async () => {
    const { getByText } = render(<Cart />, mocks);
    await wait(() => getByText("You have 1 item in your cart."));
  });

  it.todo("closes the cart");
});
