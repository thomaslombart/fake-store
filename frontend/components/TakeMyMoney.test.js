import { fireEvent, wait } from "@testing-library/react";
import NProgress from "nprogress";
import Router from "next/router";

import { render, fakeUser, fakeCartItem, fakeOrder } from "../lib/testUtils";
import TakeMyMoney, { CREATE_ORDER_MUTATION } from "./TakeMyMoney";
import { CURRENT_USER_QUERY } from "./User";

Router.router = { push: jest.fn() };

const order = fakeOrder();
const mocks = [
  {
    request: {
      query: CREATE_ORDER_MUTATION,
      variables: {
        token: "res123"
      }
    },
    result: {
      data: {
        id: order.id,
        charge: order.charge,
        total: order.total,
        items: order.items
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
  }
];

describe("TakeMyMoney", () => {
  it.todo("creates an order ontoken");
  it.todo("turns the progress bar on");
  it.todo("routes to the order page when completed");
});
