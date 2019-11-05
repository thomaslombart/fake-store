import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router from "next/router";

import Error from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      price
    }
  }
`;

const UpdateItem = ({ id }) => {
  const [state, setState] = useState({});

  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setState(state => ({ ...state, [name]: val }));
  };

  const { loading: loadingItem, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });

  const [updateItem, { loading, error }] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: { ...state, id }
  });

  if (loadingItem) return <p>Loading...</p>;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const res = await updateItem();
        Router.push({
          pathname: "/item",
          query: {
            id: res.data.updateItem.id
          }
        });
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sav{loading ? "ing" : "e"} Changes</button>
      </fieldset>
    </form>
  );
};

export default UpdateItem;
export { SINGLE_ITEM_QUERY, UPDATE_ITEM_MUTATION };
