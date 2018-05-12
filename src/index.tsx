import FocusPage from "components/FocusPage";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter as Router } from "react-router-dom";
// import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

// tslint:disable-next-line:no-unused-expression
// injectGlobal`
// body {
//   margin: 0;
//   padding: 0;
//   font-family: sans-serif;
//   height: 100%;
// }
// html,
// #root {
//   height: 100%;
// }
// `;

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <MuiThemeProvider theme={theme}>
          <FocusPage />
        </MuiThemeProvider>
      </Router>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept();
}

render(FocusPage);

registerServiceWorker();
