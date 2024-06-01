import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ThemeDataProvider from "./context/ThemeContext.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store.ts";
import { interceptor } from "./shared/services/interceptor.ts";
import { PersistGate } from "redux-persist/integration/react";
import TanstackQueryProvider from "./shared/TanstackQueryProvider.tsx";

// token interceptor invoked
interceptor();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeDataProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TanstackQueryProvider>
          <App />
        </TanstackQueryProvider>
      </PersistGate>
    </Provider>
  </ThemeDataProvider>
);
