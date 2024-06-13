import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box, Checkbox } from "@chakra-ui/react"; // Import Box for background image
import { FaPlus, FaEdit, FaTrash, FaHeart } from "react-icons/fa"; // Importing FaHeart for Hello Kitty theme

const Index = () => {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addChore = () => {
    if (newChore.trim() !== "") {
      setChores([...chores, { text: newChore, completed: false }]);
      setNewChore("");
    }
  };

  const deleteChore = (index) => {
    setChores(chores.filter((_, i) => i !== index));
  };

  const editChore = (index) => {
    setEditingIndex(index);
    setEditingText(chores[index].text);
  };

  const saveChore = (index) => {
    const updatedChores = chores.map((chore, i) => (i === index ? { ...chore, text: editingText } : chore));
    setChores(updatedChores);
    setEditingIndex(null);
    setEditingText("");
  };

  const toggleComplete = (index) => {
    const updatedChores = chores.map((chore, i) => (i === index ? { ...chore, completed: !chore.completed } : chore));
    setChores(updatedChores);
  };

  return (
    <Box bgImage="url('/images/hello-kitty-background.png')" bgSize="cover" bgPosition="center" minH="100vh">
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="3xl" fontWeight="bold" color="brand.900">Hello Kitty Chore List</Text>
        <HStack width="100%">
          <Input
            placeholder="Enter a new chore"
            value={newChore}
            onChange={(e) => setNewChore(e.target.value)}
          />
          <IconButton
            aria-label="Add Chore"
            icon={<FaHeart />} // Changed icon to FaHeart
            colorScheme="brand.900"
            onClick={addChore}
          />
        </HStack>
        <VStack spacing={3} width="100%">
          {chores.map((chore, index) => (
            <HStack key={index} width="100%" justifyContent="space-between" p={2} bg="brand.700" borderRadius="md">
              <Checkbox isChecked={chore.completed} onChange={() => toggleComplete(index)}>
                {editingIndex === index ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => saveChore(index)}
                  />
                ) : (
                  <Text as={chore.completed ? "s" : ""}>{chore.text}</Text>
                )}
              </Checkbox>
              <HStack>
                <IconButton
                  aria-label="Edit Chore"
                  icon={<FaEdit />}
                  colorScheme="brand.800"
                  onClick={() => editChore(index)}
                />
                <IconButton
                  aria-label="Delete Chore"
                  icon={<FaTrash />}
                  colorScheme="brand.500"
                  onClick={() => deleteChore(index)}
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
    </Box>
  );
};

export default Index;