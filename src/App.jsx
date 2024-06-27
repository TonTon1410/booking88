import { Provider } from "react-redux";
import "../src/App.css";
import router from "./config/router.jsx";
import { persistor, store } from "./redux/store.js";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
