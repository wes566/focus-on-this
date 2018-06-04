import FocusPage from "components/FocusPage";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter as Router } from "react-router-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";
import { PrimaryBackgroundColor, PrimaryForegroundColor } from "./styles";

const theme = {
  colorBackground: PrimaryBackgroundColor,
  colorTextDefault: PrimaryForegroundColor
};

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  position: fixed;
  font-family: roboto,sans-serif;
  margin: 0px;
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
