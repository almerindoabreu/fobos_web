import React from "react";
import Routes from "./routes";
import Layout from "./components/Layout"
import GlobalStyles from "./styles/global.js"
import '../node_modules/react-vis/dist/style.css';

function App() {
  return (
    <>
    <GlobalStyles />
    <Layout>
      <Routes />
    </Layout>
    </>
  );
}

export default App;
