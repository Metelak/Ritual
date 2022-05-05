import React from 'react';
import {
  Collapse,
  Text,
  List,
  ListItem,
  ListIcon,
  Center,
  Flex,
  Heading,
  IconButton
} from '@chakra-ui/react';
import { ChevronRightIcon, InfoIcon, ArrowUpIcon } from '@chakra-ui/icons';

const GoalReflection = ({
  reflectionOpen,
  reflections,
  toggleReflection,
  goalName
}) => {
  return (
    <Collapse in={reflectionOpen} animateOpacity>
      <Flex
        p="40px"
        color="white"
        ml="2"
        mr="2"
        bg="teal.300"
        rounded="md"
        shadow="md"
        flexDir="column">
        <Flex flexDir="row" justifyContent="space-between" mb="10px">
          <Heading>{goalName} Reflection</Heading>
          <IconButton
            size="md"
            mt="-5"
            onClick={toggleReflection}
            icon={<ArrowUpIcon />}
            variant="ghost"
            colorScheme="teal"
            borderRadius="full"
            fontSize="xl"
            aria-label="Close Reflections"
          />
        </Flex>
        {!reflections.length ? (
          <Center>
            <Text>
              <InfoIcon mb="1px" mr="5px" />
              You have not written any reflections yet. Please reflect on this
              goal.
            </Text>
          </Center>
        ) : (
          <List>
            {reflections.map((reflection) => {
              return (
                <ListItem key={reflection._id} mb="5px">
                  <ListIcon as={ChevronRightIcon} mb="1px" mr="5px"></ListIcon>
                  {reflection.reflectionText}
                </ListItem>
              );
            })}
          </List>
        )}
      </Flex>
    </Collapse>
  );
};

export default GoalReflection;
