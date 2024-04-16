import "@/App.css";
import { useEffect } from "react";
import Navbar from "@/components/Header";
import AppContainer from "@/components/AppContainer";
import { BrowserRouter as Router } from "react-router-dom";
import Toast from "@/shared/widgets/Toast.tsx";
import { useAppSelector, useAppDispatch } from "@/redux/store/store.ts";
import { handleAuth, handleLogout } from "@/redux/slices/auth.ts";


function App() {
  const auth = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const localAuth = JSON.parse(localStorage.getItem("user-info") || "{}");
  
  // parse jsonwebtoken
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };


  useEffect(() => {
    if (localAuth! === "{}") {
      const decodedJwt = parseJwt(localAuth.accessToken);
      if (decodedJwt&&decodedJwt.exp * 1000 < Date.now()) {
        dispatch(handleLogout());
      }
      dispatch(handleAuth(localAuth));
    }
  }, [localStorage]);

  return (
    <Router>
      <Navbar auth={auth} />
      <AppContainer />
      <Toast />
    </Router>
  );
}

export default App;
