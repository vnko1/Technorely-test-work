import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { AppProvider } from "@/context";
import { QueryProvider, Router } from "@/containers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryProvider>
        <AppProvider>
          <Router />
          <Toaster
            position="top-right"
            reverseOrder
            toastOptions={{ duration: 5000 }}
          />
        </AppProvider>
      </QueryProvider>
    </LocalizationProvider>
  );
}

export default App;
