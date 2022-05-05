import React from 'react';
import {
  Collapse,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  Heading,
  IconButton,
  Center
} from '@chakra-ui/react';
import { InfoIcon, ChevronRightIcon, ArrowUpIcon } from '@chakra-ui/icons';

const GoalChallenges = ({
  challengeOpen,
  challenges,
  toggleChallenges,
  goalName
}) => {
  return (
    <Collapse in={challengeOpen} animateOpacity>
      <Flex
        p="40px"
        color="white"
        ml="2"
        mr="2"
        bg="pink.300"
        rounded="md"
        shadow="md"
        flexDir="column">
        <Flex flexDir="row" justifyContent="space-between" mb="10px">
          <Heading>{goalName} Challenges</Heading>
          <IconButton
            size="md"
            mt="-5"
            onClick={toggleChallenges}
            icon={<ArrowUpIcon />}
            variant="ghost"
            colorScheme='red'
            borderRadius="full"
            fontSize="xl"
            aria-label="Close Challenges"
          />
        </Flex>
        {!challenges.length ? (
          <Center>
            <Text>
              <InfoIcon mb="1px" mr="5px" />
              You have not written any challenges yet. Please write some
              challenges you found with this goal.
            </Text>
          </Center>
        ) : (
          <List>
            {challenges.map((challenge) => {
              return (
                <ListItem key={challenge._id} mb="5px">
                  <ListIcon as={ChevronRightIcon} mb="1px" mr="5px"></ListIcon>
                  {challenge.challengeText}
                </ListItem>
              );
            })}
          </List>
        )}
      </Flex>
    </Collapse>
  );
};

export default GoalChallenges;
