import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const CartCount = ({ count }) => (
  <span>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <div data-testid="cart-count">{count}</div>
      </CSSTransition>
    </TransitionGroup>
  </span>
);

export default CartCount;
