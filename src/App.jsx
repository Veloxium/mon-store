import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPages from "./pages/allpages";
import Homepage from "./pages/homepage";
import DetailPages from "./pages/detailpages";
import { PagesProvider } from "./utils/datacontext";
import CartPages from "./pages/cartpages";
import SearchPages from "./pages/searchpages";

function App() {
  return (
    <PagesProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<CartPages />} />
            <Route path="/search/:id" element={<SearchPages />} />
            <Route path="/pokemon/:id" element={<AllPages />} />
            <Route path="/pokemon/:id/detail" element={<DetailPages />} />
          </Routes>
        </BrowserRouter>
      </div>
    </PagesProvider>
  );
}

export default App;
