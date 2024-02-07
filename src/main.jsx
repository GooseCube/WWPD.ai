import ReactDOM from "react-dom/client";
import AuthProvider from "./components/contextProviders/AuthProvider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
