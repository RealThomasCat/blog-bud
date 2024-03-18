import { useDispatch } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch(); // Dispatch is a function that allows you to dispatch actions to the Redux store.

  // Whenever the application loads, ask the service if logged in or not
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // If user data is returned, dispatch the login action to set the state
          dispatch(login({ userData }));
        } else {
          // If no user data is returned, dispatch the logout action to clear the state
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error(error);
      })
      // No matter what happens, set loading to false
      .finally(() => setLoading(false));
  }, []);

  // Conditional rendering based on the loading state
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
