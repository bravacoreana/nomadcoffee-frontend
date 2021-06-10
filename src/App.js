import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import LogIn from "./screens/LogIn";
import NotFound from "./screens/NotFound";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, isDarkModeVar, client } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout";
import SignUp from "./screens/SignUp";
import { HelmetProvider } from "react-helmet-async";
import CreateShop from "./screens/CreateShop";
import routes from "./routes";
import EditShop from "./screens/EditShop";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isDarkMode = useReactiveVar(isDarkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <LogIn />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path="/sign-up">
                  <SignUp />
                </Route>
              ) : null}

              <Route path="/users">
                <h1>user</h1>
              </Route>
              <Route path={routes.createShop}>
                <Layout>
                  <CreateShop />
                </Layout>
              </Route>
              {isLoggedIn && (
                <Route path={`/shop/:id`}>
                  <Layout>
                    <EditShop />
                  </Layout>
                </Route>
              )}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
