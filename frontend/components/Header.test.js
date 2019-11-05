import { waitForElement } from "@testing-library/react";

import { render, fakeUser, fakeCartItem } from "../lib/testUtils";
import Header from "./Header";
import { CURRENT_USER_QUERY } from "./User";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
        }
      }
    }
  }
];

describe("Nav", () => {
  it("renders a minimal nav when signed out", async () => {
    const { getByText, queryByText } = render(<Header />, notSignedInMocks);
    await waitForElement(() => getByText("Sign In"));
    expect(queryByText("Orders")).not.toBeInTheDocument();
  });

  it("renders full nav when signed in", async () => {
    const { getByText, queryByText } = render(<Header />, signedInMocks);
    await waitForElement(() => getByText("Sign Out"));
    expect(queryByText("Sign In")).not.toBeInTheDocument();
  });

  it("renders the amount of items in the cart", async () => {
    const { getByTestId } = render(<Header />, signedInMocksWithCartItems);
    const cartCount = await waitForElement(() => getByTestId("cart-count"));
    expect(cartCount).toHaveTextContent("9");
  });
});
