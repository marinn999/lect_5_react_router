import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import NotFound from "./pages/NotFound/NotFound";
// import Users from "./pages/Users/Users";
// import UserDetails from "./pages/UserDetails/UserDetails";
// import PostsByUser from "./components/PostsByUser/PostsByUser";
// import PostDetails from "./components/PostDetails/PostDetails";
import { lazy, Suspense } from "react";

const About = lazy(() => import("./pages/About/About"));
const Users = lazy(() => import("./pages/Users/Users"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const UserDetails = lazy(() => import("./pages/UserDetails/UserDetails"));
const PostsByUser = lazy(() => import("./components/PostsByUser/PostsByUser"));
const PostDetails = lazy(() => import("./components/PostDetails/PostDetails"));

function App() {
  return (
    <>
      <Suspense fallback={<h2>Loading by suspense</h2>}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/users/:someonesId" element={<UserDetails />}>
            <Route
              path="info"
              element={<h2>Lorem, ipsum. Quos, quaerat!</h2>}
            ></Route>
            <Route path="posts" element={<PostsByUser />}>
              <Route path=":postId/details" element={<PostDetails />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
