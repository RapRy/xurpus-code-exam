import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Home, Create, Update } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-5 mt-3 max-w-4xl lg:mx-auto">
        <header className="mb-7">
          <h1 className="text-2xl font-sans text-black1">
            <span className="font-bold">Calendar</span>
            <span className="font-normal">APP</span>
          </h1>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/:id" element={<Update />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
