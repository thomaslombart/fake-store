import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import User from "./User";

import CartItem from "./CartItem";
import TakeMyMoney from "./TakeMyMoney";

import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

function Cart() {
  const { data: localState } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <User>
      {({ me }) => {
        if (!me) return null;
        return (
          <div open={localState.cartOpen}>
            <header>
              <button onClick={toggleCart} title="close">
                &times;
              </button>
              <p>{me.name}'s Cart</p>
              <p>
                You have {me.cart.length} item{me.cart.length === 1 ? "" : "s"}{" "}
                in your cart.
              </p>
            </header>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              {me.cart.length && (
                <TakeMyMoney>
                  <button>Checkout</button>
                </TakeMyMoney>
              )}
            </footer>
          </div>
        );
      }}
    </User>
  );
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
