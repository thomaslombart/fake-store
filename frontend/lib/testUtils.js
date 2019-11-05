import casual from "casual";
import { render as rtl } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { useApolloClient } from "@apollo/react-hooks";

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: "Item",
  id: "abc123",
  price: 5000,
  user: null,
  image: "cat-small.jpg",
  title: "cats are best",
  description: "cats",
  largeImage: "cat.jpg"
});

const secondFakeItem = () => ({
  __typename: "Item",
  id: "azerty",
  price: 3500,
  user: null,
  image: "dog-small.jpg",
  title: "dogs are best",
  description: "dogs",
  largeImage: "dog.jpg"
});

const fakeUser = () => ({
  __typename: "User",
  id: "4234",
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  cart: []
});

const fakeOrderItem = () => ({
  __typename: "OrderItem",
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words()
});

const fakeOrder = () => ({
  __typename: "Order",
  id: "ord123",
  charge: "ch_123",
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: "2018-04 - 06T19: 24: 16.000Z",
  user: fakeUser()
});

const fakeCartItem = overrides => ({
  __typename: "CartItem",
  id: "omg123",
  quantity: 3,
  item: fakeItem(),
  user: fakeUser(),
  ...overrides
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

const render = (component, mocks = []) => {
  let apolloClient;

  const Wrapper = () => {
    const client = useApolloClient();

    if (client) {
      apolloClient = client;
    } else {
      throw new Error("Apollo Client is not initialized.");
    }

    return <div>{component}</div>;
  };

  return {
    ...rtl(
      <MockedProvider mocks={mocks}>
        <Wrapper />
      </MockedProvider>
    ),
    apolloClient
  };
};

export {
  render,
  LocalStorageMock,
  fakeItem,
  secondFakeItem,
  fakeUser,
  fakeCartItem,
  fakeOrder,
  fakeOrderItem
};
