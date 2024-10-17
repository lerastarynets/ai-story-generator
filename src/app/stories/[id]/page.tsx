import { Box, Typography } from '@mui/material';
import { notFound } from 'next/navigation';

import { getStoryById } from '@/server-actions/stories';

const Page = async ({ params }: { params: { id: string } }) => {
  const { data: story } = await getStoryById(params.id);

  if (!story) {
    notFound();
  }

  return (
    <Box className='space-y-4'>
      <Typography align='center' variant='h4'>
        {story.name}
      </Typography>
      <Typography variant='body1'>
        {story.content.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </Typography>
    </Box>
  );
};

export default Page;
