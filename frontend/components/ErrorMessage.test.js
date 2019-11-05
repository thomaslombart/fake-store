import { render } from "@testing-library/react";

import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage", () => {
  it("displays an error message", () => {
    const error = {
      message: "Password invalid"
    };

    const { getByText } = render(<ErrorMessage error={error} />);
    getByText("Shoot!");
    getByText("Password invalid");
  });

  it("removes GraphQL error words from the error message", () => {
    const error = {
      message: "GraphQL error: Password invalid"
    };

    const { getByText } = render(<ErrorMessage error={error} />);
    getByText("Shoot!");
    getByText("Password invalid");
  });
});
