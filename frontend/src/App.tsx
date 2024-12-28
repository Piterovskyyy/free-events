import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import SignInPage from "./pages/SignInPage";
import EventsPage from "./pages/EventsPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/sign-up" element={ <SignUpPage/> } />
        <Route path="/sign-in" element={ <SignInPage/> } />
        <Route path="/events" element={ <EventsPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
