/** @format */

import Router from "./routes/router";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
