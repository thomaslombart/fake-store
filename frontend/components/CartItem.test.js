import { render, fakeCartItem } from "../lib/testUtils";
import CartItem from "./CartItem";

describe("CartItem", () => {
  it("shows the item has been removed if the item is not there", () => {
    const { getByText } = render(
      <CartItem cartItem={fakeCartItem({ item: null })} />
    );
    getByText(/This item has been removed/i);
  });

  it("shows the name, total, quantity and price for each item", () => {
    const { getByText } = render(<CartItem cartItem={fakeCartItem()} />);
    getByText(/cats are best/i);
    getByText(/\$150/);
    getByText(/3 × \$50 each/i);
  });
});
