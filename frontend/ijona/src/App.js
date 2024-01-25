import React, { useState } from "react";

import DataTable from "./DataTable";
import { DataProvider } from "./DataContext";
import AuthPage from "./Auth";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

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
          <Heading ml={"20px"}> {user}</Heading>

          <DataTable />
        </Box>
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
