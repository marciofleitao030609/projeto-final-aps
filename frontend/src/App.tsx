
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import "./styles/App.css";

  



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
