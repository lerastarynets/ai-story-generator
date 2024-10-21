import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { saveStorySchema } from '@/lib/formSchemas';
import { toastError, toastSuccess } from '@/lib/toastUtils';
import { saveStory } from '@/server-actions/stories';
import { TSaveStoryData } from '@/types/stories';

interface ISaveStoryFormProps {
  generatedStory: string;
  setGeneratedStory: Dispatch<SetStateAction<string | null>>;
}

const SaveStoryForm = ({ generatedStory, setGeneratedStory }: ISaveStoryFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: { name: '', content: generatedStory },
    resolver: yupResolver(saveStorySchema),
  });

  const handleSave = async (formData: TSaveStoryData) => {
    try {
      const response = await saveStory(formData);

      if (!response.success) {
        return toastError(response.error);
      }

      setGeneratedStory(null);
      toastSuccess('Story saved successfully!');
    } catch (error) {
      toastError(`An unexpected error occured: ${error}`);
    }
  };

  const handleDiscard = () => {
    setGeneratedStory(null);
    toastSuccess('Story discarded');
  };

  return (
    <Box className='space-y-3'>
      <Typography variant='h5'>Generated Story</Typography>
      <Box className='rounded bg-gray-100 p-4'>
        <Typography variant='body1'>
          {generatedStory.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Typography>
      </Box>
      <form className='w-full space-y-2' onSubmit={handleSubmit(handleSave)}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label='Story Name'
              variant='outlined'
              color='secondary'
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Box className='flex space-x-2'>
          <LoadingButton type='submit' loading={isSubmitting} variant='contained' color='secondary' disabled={!isValid}>
            {isSubmitting ? 'Saving...' : 'Save Story'}
          </LoadingButton>
          <Button variant='outlined' color='error' onClick={handleDiscard}>
            Discard Story
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SaveStoryForm;
