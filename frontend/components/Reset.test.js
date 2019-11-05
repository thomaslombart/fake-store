import { fireEvent, wait } from "@testing-library/react";

import { render, fakeUser } from "../lib/testUtils";
import Reset, { RESET_MUTATION } from "./Reset";
import { CURRENT_USER_QUERY } from "./User";

const me = fakeUser();
const mocks = [
  {
    request: {
      query: RESET_MUTATION,
      variables: {
        resetToken: "tokentest",
        password: "azerty",
        confirmPassword: "azerty"
      }
    },
    result: {
      data: {
        resetPassword: {
          __typename: "User",
          id: "123",
          email: "test@test.com",
          name: "test"
        }
      }
    }
  },
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
];

describe("Reset", () => {
  it("displays a success message if the email is entered", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <Reset resetToken={"tokentest"} />,
      mocks
    );

    const password = getByPlaceholderText("password");
    const confirmPassword = getByPlaceholderText("confirmPassword");

    fireEvent.change(password, {
      target: { value: "azerty" }
    });
    fireEvent.change(confirmPassword, {
      target: { value: "azerty" }
    });

    expect(password).toHaveValue("azerty");
    expect(confirmPassword).toHaveValue("azerty");

    fireEvent.click(getByRole("button"));
    await wait();

    expect(password).toHaveTextContent("");
    expect(confirmPassword).toHaveTextContent("");
  });
});
