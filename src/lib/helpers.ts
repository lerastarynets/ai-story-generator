// Helper function to generate the prompt dynamically
export const generatePrompt = ({
  character1,
  character2,
  relationship,
  events,
}: {
  character1: string;
  character2: string;
  relationship: string;
  events: { event: string }[];
}) => {
  let prompt = `Write a story about ${character1} and ${character2}. They have a ${relationship} relationship.`;

  prompt += ' The story should include the following events:\n';
  events.forEach(({ event }, index) => {
    prompt += `${index + 1}. ${event}\n`;
  });

  return prompt;
};
