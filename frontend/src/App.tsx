import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/sign-up" element={ <SignUpPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
