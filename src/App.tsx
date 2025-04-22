import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ArticlesPage from "./pages/articles";
import JournalsPage from "./pages/journals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
