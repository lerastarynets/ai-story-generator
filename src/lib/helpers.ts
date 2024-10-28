import { compare, genSalt, hash } from 'bcryptjs';

// Helper function to generate the OpenAI prompt dynamically
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

export const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

  const customSalt = await genSalt(saltRounds);

  const hashedPassword = await hash(password, customSalt);

  return hashedPassword;
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
  const isMatch = await compare(plainPassword, hashedPassword);
  return isMatch;
};
