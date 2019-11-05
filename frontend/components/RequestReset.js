import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

const RequestReset = () => {
  const [email, setEmail] = useState("");

  const [reset, { error, loading, called }] = useMutation(
    REQUEST_RESET_MUTATION
  );

  return (
    <form
      method="post"
      data-test="form"
      onSubmit={async e => {
        e.preventDefault();
        await reset({ variables: { email } });
        setEmail("");
      }}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request a password reset</h2>
        <Error error={error} />
        {!error && !loading && called && (
          <p>Success! Check your email for a reset link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <button type="submit">Request Reset!</button>
      </fieldset>
    </form>
  );
};

export default RequestReset;
export { REQUEST_RESET_MUTATION };
