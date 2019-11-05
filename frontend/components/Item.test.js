import { render } from "../lib/testUtils";
import Item from "./Item";

const fakeItem = {
  id: "ABC123",
  title: "A Cool Item",
  price: 4000,
  description: "This item is really cool!",
  image: "dog.jpg",
  largeImage: "largedog.jpg"
};

describe("Item", () => {
  it("renders and matches the snapshot", () => {
    const { getByText } = render(<Item item={fakeItem} />);

    getByText("$40");
  });
});
