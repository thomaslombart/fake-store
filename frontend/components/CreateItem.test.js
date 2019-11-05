import { fireEvent, waitForElement, wait } from "@testing-library/react";
import Router from "next/router";
import axios from "axios";

import CreateItem, { CREATE_ITEM_MUTATION } from "../components/CreateItem";
import { render, fakeItem } from "../lib/testUtils";

Router.router = { push: jest.fn() };

jest.mock("axios", () => {
  return {
    post: jest.fn().mockResolvedValue({
      data: {
        secure_url: "https://dog.com/dog.jpg",
        eager: [{ secure_url: "https://dog.com/dog.jpg" }]
      }
    })
  };
});

describe("CreateItem", () => {
  afterEach(() => {
    axios.post.mockReset();
  });

  it("uploads a file when changed", async () => {
    const { getByPlaceholderText, getByAltText } = render(<CreateItem />);
    const input = getByPlaceholderText(/Upload an image/i);
    fireEvent.change(input, { target: { files: ["fakedog.jpg"] } });
    const img = await waitForElement(() => getByAltText(/Upload preview/i));
    expect(img.src).toBe("https://dog.com/dog.jpg");
    expect(axios.post).toHaveBeenCalled();
  });

  it("creates an item when the form is submitted", async () => {
    const item = fakeItem();
    const mocks = [
      {
        request: {
          query: CREATE_ITEM_MUTATION,
          variables: {
            title: item.title,
            description: item.description,
            image: "",
            largeImage: "",
            price: item.price
          }
        },
        result: {
          data: {
            createItem: {
              ...fakeItem,
              id: "abc123",
              __typename: "Item"
            }
          }
        }
      }
    ];

    const { getByPlaceholderText, getByRole } = render(<CreateItem />, mocks);
    fireEvent.change(getByPlaceholderText(/title/i), {
      target: { value: item.title }
    });
    fireEvent.change(getByPlaceholderText(/price/i), {
      target: { value: item.price }
    });
    fireEvent.change(getByPlaceholderText(/description/i), {
      target: { value: item.description }
    });

    fireEvent.click(getByRole("button"));

    await wait();

    expect(Router.router.push).toHaveBeenCalled();
    expect(Router.router.push).toHaveBeenCalledWith({
      pathname: "/item",
      query: { id: "abc123" }
    });
  });
});
