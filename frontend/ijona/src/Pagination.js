import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";

  

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
const { data, datalength, page, limit, setPage } = useContext(DataContext);
  const indexOfLastItem = page * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
     
  const totalPages = Math.ceil(data.length / page);

  const handlePageAdd = () => {
    setPage((page)=>page+1)
  };
  const handlePageSub = () => {
    setPage((page) => page - 1);
  };

  return (
    <Flex>
      <Flex justify={""} align={"center"}>
        <Text>
          Showing {indexOfFirstItem + 1}-
          {Math.max(indexOfLastItem, data.length)} of {datalength}
        </Text>
      </Flex>
      <Box>
        <Button
          onClick={handlePageSub}
          bg={"transparent"}
          isDisabled={page == 1}
        >
          {"<"}
        </Button>
        <Button
          onClick={handlePageAdd}
          isDisabled={page >= data.length - 1}
          bg={"transparent"}
        >
          {">"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
