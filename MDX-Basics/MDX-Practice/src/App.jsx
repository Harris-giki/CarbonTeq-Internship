import { MDXProvider } from "@mdx-js/react";
import Counter from "./components/Counter";
import Content from "./example.mdx";
import Showpie from "./components/Showpie";
import "./App.css";

function App() {
  const components = { Counter, Showpie };

  return (
    <>
      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </>
  );
}

export default App;
