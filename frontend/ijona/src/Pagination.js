import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";

  

const Pagination = () => {
   
const { data, datalength, page, limit, setPage } = useContext(DataContext);
  const indexOfLastItem = page * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
   const totalPages = Math.ceil(datalength / limit);
   const startItem = (page - 1) * limit + 1;
   const endItem = Math.min(startItem + limit - 1, datalength);
  const handlePageAdd = () => {
    setPage((page)=>page+1)
  };
  const handlePageSub = () => {
    setPage((page) => page - 1);
  };

  return (
    <Flex justify={"right"}>
      <Flex justify={""} align={"center"}>
        <Text>
          Showing {startItem}-
          {endItem}
        </Text>
      </Flex>
      <Box>
        <Button
          onClick={handlePageSub}
          bg={"transparent"}
          isDisabled={page === 1}
        >
          {"<"}
        </Button>
        <Button
          onClick={handlePageAdd}
          isDisabled={page >= totalPages}
          bg={"transparent"}
        >
          {">"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
