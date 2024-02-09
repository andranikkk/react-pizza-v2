import React, { Suspense, createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Loadable from "react-loadable";

import "./App.scss";
import Home from "./Pages/Home.tsx";

export const SearchContext = createContext({})

// const Cart = React.lazy(() => import(/* webpackChunkName: Cart */ "./Pages/Cart.tsx"));
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: Cart */ "./Pages/Cart.tsx"),
  loading: () => <div>Dynamic Loading.../</div>,
});
const NotFound = React.lazy(
  () => import(/* webpackChunkName: NotFound */ "./Pages/NotFound.tsx")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: FullPizza */ "./Pages/FullPizza.tsx")
);
const MainLayout = React.lazy(
  () => import(/* webpackChunkName: MainLayout */ "./layouts/MainLayout.tsx")
);

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Dynamic Loading.../</div>}>
              <MainLayout />
            </Suspense>
          }
        >
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Dynamic Loading.../</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Dynamic Loading.../</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Dynamic Loading.../</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
