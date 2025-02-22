import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import JobForm from "./components/JobForm";
import EditJob from "./components/EditJob";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<JobForm />} />
              <Route path="/edit/:id" element={<EditJob />} />
              <Route path="/details/:id" element={<JobDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
