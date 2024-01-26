// DataTable.js
import  { useContext, useRef, useState } from "react";
import { DataContext } from "./DataContext";
import { DeleteIcon } from "@chakra-ui/icons";
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
  Spinner,
  Heading,
} from "@chakra-ui/react";
import Pagination from "./Pagination";
 

const DataTable = ({user , logout}) => {
  const {
    data,
    setLimit,
    limit,
    setData,
    setName,
    setEmail,
    addData,
    deleteData,
    loading
  } = useContext(DataContext);
   
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const openEditModal = (id, name, email) => {
    setSelectedId(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditModalOpen(true);
      

  };

  const saveChanges = () => {
    // Perform actions to save changes (e.g., update the table data)
    const updatedData = data.map((item) =>
      item.id === selectedId
        ? { ...item, name: editedName, email: editedEmail }
        : item
    );
    setData(updatedData);

    // Close the modal
    setEditModalOpen(false);
  };
  if(loading) {
    return (
      <Flex w={"100%"} h={"100vh"} justify={"center"} align={"center"} >
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Box width={"95%"}>
      <Flex mt={"40px"} mb={"40px"} justifyContent="space-between">
        <Heading ml={"20px"}> {user}</Heading>
        <Box>
          <Button bg={"#4F6F52"} color={"white"} mr={"10px"} onClick={onOpen}>
            ADD
          </Button>
          <Button bg={"#4F6F52"} color={"red"} onClick={logout}>
            Logout
          </Button>
        </Box>
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
            <Button colorScheme="blue" mr={3} onClick={() => addData(onClose)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <TableContainer>
        <Table variant="simple" margin={"auto"}>
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
                <Td textAlign={"center"}>{item.id}</Td>
                <Td textAlign={"center"}>{item.name}</Td>
                <Td textAlign={"center"}>{item.email}</Td>
                <Td>
                  <Flex justify={"space-around"}>
                    <Button
                      bg={"transparent"}
                      color={"blue"}
                      onClick={() =>
                        openEditModal(item.id, item.name, item.email)
                      }
                    >
                      Edit
                    </Button>

                    <Button onClick={() => deleteData(item.id)}>
                      <DeleteIcon color="red.500" />
                    </Button>
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
          w={"70px"}
          variant="flushed"
          textAlign={"center"}
          value={limit}
          onChange={(e) => {
            setLimit(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </Select>
        <Pagination />
      </Flex>
      {/* Model for Edit the Existing Data */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => saveChanges()}>
              Save Changes
            </Button>
            <Button onClick={() => setEditModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DataTable;
