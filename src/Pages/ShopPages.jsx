import { Outlet } from "react-router";
import Header from "../Components/Header";
import NavBar from "../Components/NavBar";
import { createContext, useState } from "react";
import Footer from "../Components/Footer";
export const CounterContext = createContext();
export const SearchContext = createContext();
function ShopPages() {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      <div>
        <Header />
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </CounterContext.Provider>
  );
}

export default ShopPages;