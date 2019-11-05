import React from "react";
import { useMutation } from "@apollo/react-hooks";
import PropTypes from "prop-types";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const RemoveFromCart = ({ id }) => {
  const update = (cache, payload) => {
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    update,
    optimisticResponse: {
      __typename: "Mutation",
      removeFromCart: {
        __typename: "CartItem",
        id
      }
    }
  });

  return (
    <button
      disabled={loading}
      onClick={() => {
        removeFromCart({ variables: { id } }).catch(err => alert(err.message));
      }}
      title="Delete Item"
    >
      &times;
    </button>
  );
};

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired
};

export default RemoveFromCart;
export { REMOVE_FROM_CART_MUTATION };
