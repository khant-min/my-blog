import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/routes/home/Home";
import Feeds from "./components/routes/feed/Feeds";
import Build from "./components/routes/build/Build";
import FOF from "./components/404_page/FOF";
import Feed from "./components/routes/feed/Feed";

const App = () => {
  return (
    <div className="page-wrapper">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="build" element={<Build />} />
          <Route path="feeds" element={<Feeds />} />
          <Route path="feeds/:id" element={<Feed />} />
          <Route path="*" element={<FOF />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
