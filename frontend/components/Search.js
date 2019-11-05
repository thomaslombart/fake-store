import React from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import debounce from "lodash.debounce";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: "/item",
    query: {
      id: item.id
    }
  });
}

function AutoComplete() {
  const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
    items: [],
    loading: false
  });

  const client = useApolloClient();

  React.useEffect(() => {
    resetIdCounter();
  });

  const onChange = debounce(async (e, client) => {
    // turn loading on
    setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    setState({
      items: res.data.items,
      loading: false
    });
  }, 350);

  return (
    <div>
      <Downshift
        onChange={routeToItem}
        itemToString={item => (item === null ? "" : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex
        }) => (
          <div>
            <input
              {...getInputProps({
                type: "search",
                placeholder: "Search For An Item",
                id: "search",
                className:
                  "mt-4 block w-full border border-transparent bg-gray-100 focus:outline-none focus:bg-white focus:border-gray-300 text-gray-900 rounded-lg px-4 py-2",
                onChange: e => {
                  e.persist();
                  onChange(e, client);
                }
              })}
            />
            {isOpen && (
              <ul>
                {state.items.map((item, index) => (
                  <li
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </li>
                ))}
                {!state.items.length && !state.loading && (
                  <li> Nothing Found {inputValue}</li>
                )}
              </ul>
            )}
          </div>
        )}
      </Downshift>
    </div>
  );
}

export default AutoComplete;
