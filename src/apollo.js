import {
  ApolloClient,
  // createHttpLink,
  from,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

const DARK_MODE = "DARK_MODE";
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  // isLoggedInVar(false);
  history?.replace();
  window.location.reload();
};

export const isDarkModeVar = makeVar(
  Boolean(localStorage.getItem(DARK_MODE) === "enabled")
);

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  isDarkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE, "enabled");
  isDarkModeVar(false);
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://nomadcoffee-backend.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  //credentials: "include",
  // fetchOptions: {
  //   mode: "cors",
  // },
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(uploadHttpLink)]),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
