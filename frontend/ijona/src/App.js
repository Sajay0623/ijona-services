import React, { useState } from "react";

import DataTable from "./DataTable";

import AuthPage from "./Auth";
import { Box,  Heading } from "@chakra-ui/react";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Box>
          <DataTable user = {user} logout = {handleLogout} />
        </Box>
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
