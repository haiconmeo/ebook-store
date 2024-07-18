import {
  Text,
  Heading,
  Box,
  useColorMode,
  Image,
  Center,
  useBreakpointValue,
  Code,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Link as ChakraLink,
  Input,
  VStack,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";

import React, { useState } from "react";

import MotionBox from "components/motion/MotionBox";
import Main from "components/wrapper/Main";

const simulatedEbooks = [
  { id: 1, title: "Ebook 1", description: "Description for Ebook 1", imageUrl: "/ebook1.jpg" },
  { id: 2, title: "Ebook 2", description: "Description for Ebook 2", imageUrl: "/ebook2.jpg" },
  { id: 3, title: "Ebook 3", description: "Description for Ebook 3", imageUrl: "/ebook3.jpg" },
  { id: 4, title: "Ebook 4", description: "Description for Ebook 4", imageUrl: "/ebook4.jpg" },
  { id: 5, title: "Ebook 5", description: "Description for Ebook 5", imageUrl: "/ebook5.jpg" },
  { id: 6, title: "Ebook 6", description: "Description for Ebook 6", imageUrl: "/ebook6.jpg" },
  { id: 7, title: "Ebook 7", description: "Description for Ebook 7", imageUrl: "/ebook7.jpg" },
  { id: 8, title: "Ebook 8", description: "Description for Ebook 8", imageUrl: "/ebook8.jpg" },
  { id: 9, title: "Ebook 9", description: "Description for Ebook 9", imageUrl: "/ebook9.jpg" },
  { id: 10, title: "Ebook 10", description: "Description for Ebook 10", imageUrl: "/ebook10.jpg" },
  { id: 11, title: "Ebook 11", description: "Description for Ebook 11", imageUrl: "/ebook11.jpg" },
  { id: 12, title: "Ebook 12", description: "Description for Ebook 12", imageUrl: "/ebook12.jpg" },
];
const fetchEbooks = (page: number, pageSize: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const data = simulatedEbooks.slice(startIndex, endIndex);
      resolve(data);
    }, 500); // Simulated delay of 500ms
  });
};
const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page
  const [ebooks, setEbooks] = useState([]);

  // Function to fetch eBooks based on current page
  const loadEbooks = async () => {
    const data = await fetchEbooks(currentPage, pageSize);
    setEbooks(data);
  };

  // Load eBooks initially
  useState(() => {
    loadEbooks();
  }, [currentPage]);

  // Handle pagination
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Filter eBooks based on search term
  const filteredEbooks = ebooks.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Main>
      <Heading as="h2">Hello World!</Heading>

      <Box p={8}>
      <Heading as="h1" mb={8}>
        E-Book Library
      </Heading>
      <Input
        placeholder="Search eBooks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />
      <VStack align="start">
        <Heading as="h2" size="md" mb={2}>
          List of eBooks:
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {filteredEbooks.map((ebook) => (
            <Flex
              key={ebook.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              flexDirection="column"
              alignItems="start"
              boxShadow="md"
            >
              <Image src={ebook.imageUrl} alt={ebook.title} mb={4} borderRadius="md" />
              <Text fontSize="lg" fontWeight="bold" mb={2}>{ebook.title}</Text>
              <Text>{ebook.description}</Text>
            </Flex>
          ))}
        </SimpleGrid>
        {/* Pagination controls */}
        <Flex mt={4} justify="center">
          <Button onClick={prevPage} mr={2} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={nextPage} ml={2}>
            Next
          </Button>
        </Flex>
      </VStack>
    </Box>
    </Main>
  );
};

export default Index;
