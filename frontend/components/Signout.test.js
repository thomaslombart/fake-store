import { fireEvent, wait } from "@testing-library/react";

import Signout, { SIGNOUT_MUTATION } from "./Signout";
import { CURRENT_USER_QUERY } from "./User";
import { render } from "../lib/testUtils";

const mocks = [
  {
    request: {
      query: SIGNOUT_MUTATION
    },
    result: {
      data: {
        signout: {
          __typename: "string",
          message: "success"
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

describe("Signout", () => {
  it("signs out the user", async () => {
    const { getByRole, apolloClient } = render(<Signout />, mocks);

    fireEvent.click(getByRole("button"));

    await wait();
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(user.data.me).toBeNull();
  });
});
