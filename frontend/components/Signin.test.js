import { fireEvent, wait } from "@testing-library/react";

import Signin, { SIGNIN_MUTATION } from "./Signin";
import { CURRENT_USER_QUERY } from "./User";
import { render, fakeUser } from "../lib/testUtils";

const me = fakeUser();
const mocks = [
  {
    request: {
      query: SIGNIN_MUTATION,
      variables: {
        email: me.email,
        password: "wes"
      }
    },
    result: {
      data: {
        signin: {
          __typename: "User",
          id: "abc123",
          email: me.email,
          name: me.name
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
];

function type(element, value) {
  fireEvent.change(element, { target: { value } });
}

describe("Signin", () => {
  it("signs in the user", async () => {
    const { getByPlaceholderText, getByRole, apolloClient } = render(
      <Signin />,
      mocks
    );

    await wait();

    type(getByPlaceholderText("email"), me.email);
    type(getByPlaceholderText("password"), "wes");

    fireEvent.click(getByRole("button"));

    await wait();
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toMatchObject(me);
  });
});
