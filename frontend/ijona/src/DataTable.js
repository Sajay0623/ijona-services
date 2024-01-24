// DataTable.js
import React, { useContext, useState } from "react";
import { DataContext } from "./DataContext";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
   
  TableContainer,
  Box,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
  Select,
} from "@chakra-ui/react";
import Pagination from "./Pagination";

const DataTable = () => {
  const { data, setLimit,   setName , setEmail,  addData, updateData, deleteData } =
    useContext(DataContext);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  

  return (
    <Box>
      <Flex mt={"40px"} mb={"40px"} justifyContent="right">
        <Button bg={"#4F6F52"} color={"white"} mr={"30px"} onClick={onOpen}>
          ADD
        </Button>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name*</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                ref={initialRef}
                isRequired
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email*</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} isRequired />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={"20px"} bg={"transparent"} onClick={onClose}>
              Go Back
            </Button>
            <Button colorScheme="blue" mr={3} onClick={addData}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <TableContainer>
        <Table variant="simple" width={"95%"} margin={"auto"}>
          <Thead bg="#4F6F52">
            <Tr>
              <Th color={"white"} textAlign="center">
                ID
              </Th>
              <Th color={"white"} textAlign="center">
                Name
              </Th>
              <Th color={"white"} textAlign="center">
                Official Email
              </Th>
              <Th color={"white"} textAlign="center">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id} borderBottom="1px solid gray">
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>
                  <Flex justify={"space-around"}>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>

      <Flex align={"center"} justify={"center"} mt={"30px"} mr={"35px"}>
        <Text textAlign={"center"}>Rows per page :</Text>
        <Select
          onChange={(e) => {
            setLimit(e.target.value);
            console.log(e.target.value);
          }}
          w={"70px"}
          variant="flushed"
          textAlign={"center"}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Select>
        <Pagination />
      </Flex>
    </Box>
  );
};

export default DataTable;
