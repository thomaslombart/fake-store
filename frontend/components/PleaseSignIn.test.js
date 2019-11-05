import { waitForElement } from "@testing-library/react";

import { render, fakeUser } from "../lib/testUtils";
import PleaseSignIn from "./PleaseSignIn";
import { CURRENT_USER_QUERY } from "./User";

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const me = fakeUser();
const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
];

describe("PleaseSignIn", () => {
  it("renders the sign in dialog to logged out users", async () => {
    const { getByText, getByPlaceholderText } = render(
      <PleaseSignIn />,
      notSignedInMocks
    );

    getByText("Loading...");
    await waitForElement(() => getByText("Please sign in before continuing"));
    getByPlaceholderText("email");
  });

  it("renders the child component when the user is signed in", async () => {
    const Hello = () => <p>Hello</p>;

    const { getByText } = render(
      <PleaseSignIn>
        <Hello />
      </PleaseSignIn>,
      signedInMocks
    );

    await waitForElement(() => getByText("Hello"));
  });
});
