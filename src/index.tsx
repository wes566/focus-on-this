import FocusPage from "components/FocusPage";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter as Router } from "react-router-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";
import { PrimaryBackgroundColor, PrimaryForegroundColor, SecondaryAccentColor, SecondaryBackgroundColor } from "./styles";

const theme = {
  colorBackground: PrimaryBackgroundColor,
  colorBackgroundSecondary: SecondaryBackgroundColor,
  colorTextDefault: PrimaryForegroundColor
};

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  position: fixed;
  font-family: roboto,sans-serif;
  margin: 0px;
}

a:link {
    text-decoration: none;
    color: ${SecondaryAccentColor};
}

a:visited {
    text-decoration: none;
    color: ${SecondaryAccentColor};
}

a:hover {
    text-decoration: underline;
}

a:active {
    text-decoration: underline;
}

li {
  margin-bottom: 1em;
}

li:last-child {
 margin-bottom: 0em;
}

`;

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <Router>
        <ThemeProvider theme={theme}>
          <FocusPage />
        </ThemeProvider>
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
