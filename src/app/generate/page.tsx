'use client';

import { useState } from 'react';

import GenerateStoryForm from '../../components/GenerateStoryForm';
import SaveStoryForm from '../../components/SaveStoryForm';

const Page = () => {
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);

  return (
    <>
      {generatedStory ? (
        <SaveStoryForm setGeneratedStory={setGeneratedStory} generatedStory={generatedStory} />
      ) : (
        <GenerateStoryForm setGeneratedStory={setGeneratedStory} />
      )}
    </>
  );
};

export default Page;
