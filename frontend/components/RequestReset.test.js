import { fireEvent, waitForElement } from "@testing-library/react";
import { render } from "../lib/testUtils";
import RequestReset, { REQUEST_RESET_MUTATION } from "./RequestReset";

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email: "john@gmail.com" }
    },
    result: {
      data: {
        requestReset: {
          __typename: "string",
          message: "You'll receive a message soon!"
        }
      }
    }
  }
];

describe("RequestReset", () => {
  it("displays a success message if the email is entered", async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(
      <RequestReset />,
      mocks
    );
    fireEvent.change(getByPlaceholderText("email"), {
      target: { value: "john@gmail.com" }
    });
    fireEvent.click(getByRole("button"));
    await waitForElement(() =>
      getByText("Success! Check your email for a reset link!")
    );
  });
});
