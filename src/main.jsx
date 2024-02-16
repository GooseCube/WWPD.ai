import ReactDOM from "react-dom/client";
import AuthProvider from "./components/contextProviders/AuthProvider.jsx";
import FirebaseProvider from "./components/contextProviders/FirebaseProvider.jsx";
import { ShowProvider } from "./components/contextProviders/ShowProvider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FirebaseProvider>
      <ShowProvider>
        <App />
      </ShowProvider>
    </FirebaseProvider>
  </AuthProvider>
);
