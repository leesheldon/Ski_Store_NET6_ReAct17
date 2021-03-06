import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalogue from "../../features/catalogue/Catalogue";
import ProductDetails from "../../features/catalogue/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useDispatch } from "react-redux";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";


function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212' // #eaeaea: light grey color
      }
    }
  });
  
  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initializing app..." />

  // sx={{ mt: 4 }} --> margin top
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Container sx={{ mt: 4 }}>
          <Switch>            
            <Route exact path='/catalogue' component={Catalogue} />
            <Route path='/catalogue/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
            <Route path='/server-error' component={ServerError} />
            <Route path='/basket' component={BasketPage} />
            <PrivateRoute path='/checkout' component={CheckoutWrapper} />
            <PrivateRoute path='/orders' component={Orders} />
            <PrivateRoute roles={['Admin']} path='/inventory' component={Inventory} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      )} />
      
    </ThemeProvider>
  );
}

export default App;
