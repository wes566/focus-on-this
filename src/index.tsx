import FocusPage from "components/FocusPage";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter as Router } from "react-router-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import registerServiceWorker from "./registerServiceWorker";

const theme = {
  colorBackground: "#1f1f1f",
  colorTextDefault: "#fafafa"
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
