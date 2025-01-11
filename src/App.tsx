import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WebTools from "./pages/WebTools";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/web-tools" element={<WebTools />} />
      </Routes>
    </Router>
  );
}

export default App;