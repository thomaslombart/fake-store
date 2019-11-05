import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <button disabled={loading} onClick={() => addToCart({ variables: { id } })}>
      Add{loading && "ing"} To Cart 🛒
    </button>
  );
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };
