import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import NProgress from "nprogress";
import gql from "graphql-tag";

import calcTotalPrice from "../lib/calcTotalPrice";
import User, { CURRENT_USER_QUERY } from "./User";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

async function onToken(res, createOrder) {
  NProgress.start();
  // manually call the mutation once we have the stripe token
  const order = await createOrder({
    variables: {
      token: res.id
    }
  }).catch(err => {
    alert(err.message);
  });
  Router.push({
    pathname: "/order",
    query: { id: order.data.createOrder.id }
  });
}

function TakeMyMoney({ children }) {
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }]
  });
  return (
    <User>
      {({ data: { me }, loading }) => {
        if (loading) return null;
        return (
          <StripeCheckout
            amount={calcTotalPrice(me.cart)}
            name="Sick Fits"
            description={`Order of ${totalItems(me.cart)} items!`}
            image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
            stripeKey="pk_test_Vtknn6vSdcZWSG2JWvEiWSqC"
            currency="USD"
            email={me.email}
            token={res => onToken(res, createOrder)}
          >
            {children}
          </StripeCheckout>
        );
      }}
    </User>
  );
}

export default TakeMyMoney;
export { CREATE_ORDER_MUTATION };
