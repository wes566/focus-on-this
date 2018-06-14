import AboutPage from "components/AboutPage";
import FocusPage from "components/FocusPage";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter, Route } from "react-router-dom";
import { injectGlobal, ThemeProvider } from "styled-components";
import "typeface-roboto";
import registerServiceWorker from "./registerServiceWorker";
import { ThemeColors } from "./styles";

const theme = {
  colorBackground: ThemeColors.PrimaryBackground,
  colorBackgroundSecondary: ThemeColors.SecondaryBackground,
  colorTextDefault: ThemeColors.PrimaryForeground
};

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
  position: fixed;
  overscroll-behavior: contain;
  font-family: roboto,sans-serif;
  margin: 0px;
}

a:link {
    text-decoration: none;
    color: ${ThemeColors.SecondaryAccent};
}

a:visited {
    text-decoration: none;
    color: ${ThemeColors.SecondaryAccent};
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
      <HashRouter>
        <ThemeProvider theme={theme}>
          <div>
            <Route exact path="/" component={FocusPage} />
            <Route path="/about" component={AboutPage} />
          </div>
        </ThemeProvider>
      </HashRouter>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept();
}

render(FocusPage);

registerServiceWorker();
