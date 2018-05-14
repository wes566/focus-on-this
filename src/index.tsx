import FocusPage from "components/FocusPage";
import grey from "material-ui/colors/grey";
// import blueGrey from "material-ui/colors/blueGrey";
import indigo from "material-ui/colors/indigo";
import CssBaseline from "material-ui/CssBaseline/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter as Router } from "react-router-dom";
import { injectGlobal } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: indigo
  }
});

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  position: fixed;
  font-family: roboto,sans-serif;
}
`;

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
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
