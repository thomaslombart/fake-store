import { fireEvent, wait } from "@testing-library/react";

import RemoveFromCart, { REMOVE_FROM_CART_MUTATION } from "./RemoveFromCart";
import { CURRENT_USER_QUERY } from "./User";
import { render, fakeUser, fakeCartItem } from "../lib/testUtils";

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: "abc123" })]
        }
      }
    }
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: "abc123" } },
    result: {
      data: {
        removeFromCart: {
          __typename: "CartItem",
          id: "abc123"
        }
      }
    }
  }
];

describe("RemoveFromCart", () => {
  it("removes the item from cart", async () => {
    const { getByRole, apolloClient } = render(
      <RemoveFromCart id="abc123" />,
      mocks
    );

    const {
      data: {
        me: { cart }
      }
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(cart).toHaveLength(1);
    expect(cart[0].item.price).toBe(5000);

    const button = getByRole("button");
    fireEvent.click(button);

    await wait();
    const {
      data: {
        me: { cart: updatedCart }
      }
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(updatedCart).toHaveLength(0);
  });
});
