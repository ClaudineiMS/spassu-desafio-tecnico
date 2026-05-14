import { useState, type JSX } from "react";
import { Box, CssBaseline } from "@mui/material";

import { AppHeader } from "./components/AppHeader/AppHeader";

function App(): JSX.Element {
  const [_isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick(): void {
    setIsMenuOpen((currentValue) => !currentValue);
  }

  return (
    <>
      <CssBaseline />
      <AppHeader title="Vendas" onMenuClick={handleMenuClick} />
    </>
  );
}

export default App;