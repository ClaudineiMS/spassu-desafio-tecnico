import { createRoot } from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import App from "./App";

dayjs.locale("pt-br");

createRoot(document.getElementById("root")!).render(
    <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
    >
        <App />
    </LocalizationProvider>
);