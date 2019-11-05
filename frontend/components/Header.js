import NProgress from "nprogress";
import Router from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";

import { TOGGLE_CART_MUTATION } from "./Cart";
import User from "./User";
import CartCount from "./CartCount";
import Signout from "./Signout";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const NavLink = ({ url, title }) => (
  <Link href={url}>
    <button className="block px-3 py-1 rounded font-semibold hover:bg-gray-200 focus:outline-none">
      {title}
    </button>
  </Link>
);

const Header = () => {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  return (
    <header>
      <div className="flex justify-between items-center">
        <h1 className="text-gray-600 font-bold uppercase text-3xl tracking-wide">
          Fake <span className="text-gray-900">Store</span>
        </h1>
        <User>
          {({ me }) => (
            <ul data-test="nav" className="flex items-center">
              <NavLink url="/items" title="Shop" />
              {me ? (
                <>
                  <NavLink url="/sell" title="Sell" />
                  <NavLink url="/orders" title="Orders" />
                  <Signout />
                  <button onClick={toggleCart}>
                    My Cart
                    <CartCount
                      count={me.cart.reduce(
                        (tally, cartItem) => tally + cartItem.quantity,
                        0
                      )}
                    />
                  </button>
                </>
              ) : (
                <NavLink url="/signup" title="Sign In" />
              )}
            </ul>
          )}
        </User>
      </div>
    </header>
  );
};

export default Header;
