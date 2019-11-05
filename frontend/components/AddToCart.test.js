import { fireEvent, wait } from "@testing-library/react";

import AddToCart, { ADD_TO_CART_MUTATION } from "./AddToCart";
import { CURRENT_USER_QUERY } from "./User";
import { render, fakeUser, fakeCartItem } from "../lib/testUtils";

const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: []
        }
      }
    }
  },
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
    request: { query: ADD_TO_CART_MUTATION, variables: { id: "abc123" } },
    result: {
      data: {
        addToCart: {
          ...fakeCartItem(),
          quantity: 1
        }
      }
    }
  }
];

describe("AddToCart", () => {
  it("adds an item to cart when clicked", async () => {
    const { getByRole, apolloClient } = render(
      <AddToCart id="abc123" />,
      mocks
    );

    const {
      data: { me }
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });

    expect(me.cart).toHaveLength(0);

    const button = getByRole("button");
    fireEvent.click(button);
    expect(button).toHaveTextContent("Adding");

    await wait();

    const {
      data: { me: meUpdated }
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(meUpdated.cart).toHaveLength(1);
    expect(meUpdated.cart[0].id).toBe("omg123");
    expect(meUpdated.cart[0].quantity).toBe(3);
  });
});
