import { Provider } from "react-redux";
import "./App.css";
import router from "./config/router.jsx";
import { persistor, store } from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
