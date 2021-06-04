# NomadCoffee Web

|  #  |   Date    |  Task  |
| :-: | :-------: | :----: |
|  1  | 03/Jun/21 | set up |

---

## TASK

- [x] Create a new Github Repository called nomadcoffee-frontend
- [x] Set up a React Application using CRA
- [x] Set up an Apollo Client
- [x] Set up react-router
- [x] Set up styled-components
- [x] Set up reactive variables on Apollo Client to enable dark mode and authentication

## 1

```
  $ npx create-react-app nomadcoffee-web
  $ git remote add origin REPO_URL
```

## 2

```
$ npm i react-router-dom
$ npm i @apollo/client graphql
$ npm i react-helmet-async
$ npm i styled-components
$ npm i styled-reset
```

```
$ npm i react-hook-form
```

```
// fontawesome(https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react)

$ npm i --save @fortawesome/fontawesome-svg-core
$ npm install --save @fortawesome/free-solid-svg-icons
$ npm install --save @fortawesome/react-fontawesome

$ npm install --save @fortawesome/free-brands-svg-icons
$ npm install --save @fortawesome/free-regular-svg-icons
```

## 3

- [ ] router
- [ ] authentication
- [ ] architecture
- [ ] styles (darkmode)

- HashRouter & BrowserRouter
  - HashRouter: easier to deploy
  - BrowserRouter
- Connect Route
  - `<Route path="/ROUTENAME">SOMETHING</Route>`
  - problem: can be rendered more than one route at the time
  - solution: `Switch`
- `Switch`
  - only render one route at the time
  - problem: `"/"` took over other routes
  - solution: `exact`

## 4

- Route without path: `Not Found`

## 5

- limitation of using `useState` for logging in/out.
  - it'd be way complicated when props go deep levels.
  - goal: any component can logged user in/out without sending any props.
  - solution: `reactive variables`
    - Apollo client handles graphQL & local state, too.
    - `isLoggedIn`, true/false is gonna be local state.

## 6

- `reactive variable` is included in `apollo client`.
- apollo client: react mixin with graphql (talks to backend)
- reactive variable: `isLoggedIn`, `isDarkMode` ...
- to use reactive variable, we need to use a hook: `useReactiveVar`

  ```js
  // apollo.js
  export const isLoggedInVar = makeVar(false);

  // App.js
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  // LogIn.js
  <button onClick={() => isLoggedInVar(true)}>log in!</button>;
  ```

## 7

styled-components: component with css

## 8

theme-provider: provide theme

- gives theme props
- theme: js object

## 9

- `<GlobalStyles/>`: apply for all pages

  ```js
  // styles.js
  export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    body {
        font-size: 12px;
        background-color: ${(props) => props.theme.bgColor}
    }
  `;

  // App.js
  <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <GlobalStyles />
    // we can access theme from GlobalStyles: styles props in body!
    <Router> ... </Router>
  </ThemeProvider>;
  ```

- styled-reset
