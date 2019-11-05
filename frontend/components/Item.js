import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

export default function Item({ item }) {
  return (
    <div>
      {item.image && <img src={item.image} alt={item.title} />}
      <h1>
        <Link
          href={{
            pathname: "/item",
            query: { id: item.id }
          }}
        >
          <a>{item.title}</a>
        </Link>
      </h1>
      <span>{formatMoney(item.price)}</span>
      <p>{item.description}</p>

      <div className="buttonList">
        <Link
          href={{
            pathname: "update",
            query: { id: item.id }
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <AddToCart id={item.id} />
        <DeleteItem id={item.id}>Delete This Item</DeleteItem>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};
