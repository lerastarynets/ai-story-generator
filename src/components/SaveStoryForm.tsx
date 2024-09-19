import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, FieldValues, useForm } from 'react-hook-form';

import { saveStorySchema } from '../lib/formSchemas';
import { toastError, toastSuccess } from '../lib/toastUtils';

interface IGeneratedStoryFormProps {
  generatedStory: string;
}

const SaveStoryForm = ({ generatedStory }: IGeneratedStoryFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: { name: '', content: generatedStory },
    resolver: yupResolver(saveStorySchema),
  });

  const handleSave = async (formData: FieldValues) => {
    console.log(formData);
    try {
      const response = await fetch('/api/stories/save', {
        method: 'POST',
        body: JSON.stringify({ ...formData }),
      });

      if (!response.ok) {
        return toastError('Failed to save story');
      }

      toastSuccess('Story saved successfully!');
    } catch (error) {
      toastError(`An unexpected error occured: ${error}`);
    }
  };

  const handleDiscard = () => {
    reset();
    toastSuccess('Story discarded');
  };

  return (
    <Box className='mt-8 space-y-3'>
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
      <form className='space-y-2' onSubmit={handleSubmit(handleSave)}>
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