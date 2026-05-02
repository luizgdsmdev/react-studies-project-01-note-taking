import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true, // reloads when you come back to the tab
      refetchOnReconnect: true, // reloads when you reconnect to internet
      retry: 1, // tries 1 time before showing error
    },
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
