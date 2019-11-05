import { fireEvent, wait } from "@testing-library/react";
import Router from "next/router";

import { render, fakeItem } from "../lib/testUtils";
import UpdateItem, {
  SINGLE_ITEM_QUERY,
  UPDATE_ITEM_MUTATION
} from "./UpdateItem";

Router.router = { push: jest.fn() };

const item = fakeItem();
const mocks = [
  {
    request: { query: SINGLE_ITEM_QUERY, variables: { id: item.id } },
    result: {
      data: {
        item: {
          __typename: "Item",
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price
        }
      }
    }
  },
  {
    request: {
      query: UPDATE_ITEM_MUTATION,
      variables: {
        id: item.id,
        title: "dogs",
        description: "dogs are best",
        price: 10000
      }
    },
    result: {
      data: {
        updateItem: {
          __typename: "Item",
          id: item.id,
          title: "dogs",
          price: 10000
        }
      }
    }
  }
];

describe("UpdateItem", () => {
  it("updates an item", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <UpdateItem id={item.id} />,
      mocks
    );
    getByText(/loading/i);

    await wait();

    fireEvent.change(getByPlaceholderText("Title"), {
      target: { value: "dogs" }
    });
    fireEvent.change(getByPlaceholderText(/price/i), {
      target: { value: 10000 }
    });
    fireEvent.change(getByPlaceholderText(/description/i), {
      target: { value: "dogs are best" }
    });

    const button = getByRole("button");
    fireEvent.click(getByRole("button"));
    expect(button).toHaveTextContent("Saving Changes");

    await wait();

    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: {
        id: item.id
      }
    });
  });
});
