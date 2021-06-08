import {
  ApolloClient,
  // createHttpLink,
  // HttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

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

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       token: localStorage.getItem(TOKEN),
//     },
//   };
// });

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  // link: authLink.concat(HttpLink),
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     User: {
  //       keyFields: (obj) => `User:${obj.username}`,
  //     },
  //   },
  // }),
});
