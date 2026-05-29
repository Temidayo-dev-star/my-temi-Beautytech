
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
          {/* Notification Engine */}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "dark:bg-neutral-900 dark:text-neutral-100 dark:border dark:border-neutral-800/80 rounded-lg text-sm",
              duration: 4000,
              style: {
                padding: "12px 16px",
              }
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
