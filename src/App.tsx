import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Nav } from "./components/Nav";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Route>
    )
  )

  return (
    <div className="App-Header">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

const Root = () => {
  return <>
    <Nav />
    <div>
      <Outlet />
    </div>
  </>
}