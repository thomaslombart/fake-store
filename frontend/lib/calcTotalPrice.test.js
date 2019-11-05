import { fakeCartItem, secondFakeItem } from "./testUtils";
import calcTotalPrice from "./calcTotalPrice";

describe("calcTotalPrice", () => {
  it("returns 0 if there are no cart items", () => {
    expect(calcTotalPrice([])).toBe(0);
  });

  it("calculates the total price of a cart", () => {
    const firstItem = fakeCartItem(); // 5000 * 3
    const secondItem = fakeCartItem({ item: secondFakeItem() }); // 3500 * 3
    const thirdItem = fakeCartItem({ quantity: 1 }); // 5000 * 1

    const cart = [firstItem, secondItem, thirdItem];
    expect(calcTotalPrice(cart)).toBe(30500);
  });
});
