// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SharedLayout from "./scenes/sharedlayout";
import Dashboard from "./scenes/dashboard";
import Users from "./scenes/users";
import LoginForm from "./scenes/login";
import NewEditUser from "./components/userModal/NewEditUser";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { PrivateRoutes, PublicRoutes } from "./components/PrivateRoutes";
import Products from "./scenes/products/index";
import NewProductEdit from "./components/productModel/NewProductEdit";
import NewProductView from "./components/productModel/NewProductView";
import Category from "./scenes/category";
import SubCategory from "./scenes/subCategory";
import NewSubCategoryForm from "./components/subCategoryModel/NewSubCategoryForm";
import NewSubCategoryEdit from "./components/subCategoryModel/NewSubCategoryEdit";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<SharedLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/users/newedituser/:id"
                  element={<NewEditUser />}
                />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/neweditproduct/:id"
                  element={<NewProductEdit />}
                />
                <Route
                  path="/products/newviewproduct/:id"
                  element={<NewProductView />}
                />
                <Route path="/category" element={<Category />} />
                <Route path="/subcategory" element={<SubCategory />} />
                <Route
                  path="/subcategory/:id"
                  element={<NewSubCategoryForm />}
                />
                <Route
                  path="/subcategory/edit/:id"
                  element={<NewSubCategoryEdit />}
                />
              </Route>
            </Route>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginForm />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
