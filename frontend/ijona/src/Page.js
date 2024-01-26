import React, { useState, useEffect } from "react";
import { Select, Button, Flex, Text } from "@chakra-ui/react";

const PagiComp = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    onPageChange(1, newItemsPerPage);
  };

  useEffect(() => {
    // Make sure the current page is within bounds when the total items change
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
      onPageChange(totalPages);
    }
  }, [totalItems]);

  return (
    <Flex alignItems="center" justifyContent="space-between" mt={4}>
      <Flex alignItems="center">
        <Text mr={2}>Items per page:</Text>
        <Select defaultValue={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </Flex>

      <Flex alignItems="center">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Text mx={4}>
          Page {currentPage} of {totalPages}
        </Text>

        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default PagiComp;
