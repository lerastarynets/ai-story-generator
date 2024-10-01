'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, useFieldArray, useForm } from 'react-hook-form';

import SaveStoryForm from '../../components/SaveStoryForm';
import { generateStorySchema } from '../../lib/formSchemas';
import { toastError, toastSuccess } from '../../lib/toastUtils';

const defaultValues = {
  character1: '',
  character2: '',
  relationship: '',
  events: [{ event: '' }],
};

const Page = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(generateStorySchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events',
  });

  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const saveFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedStory && saveFormRef.current) {
      saveFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedStory]);

  const handleGenerate = async (formData: FieldValues) => {
    try {
      const response = await fetch('/api/stories/generate', {
        method: 'POST',
        body: JSON.stringify({ ...formData }),
      });

      const data = await response.json();

      if (data.error) {
        return toastError(`Failed to generate story: ${data.error}`);
      }

      setGeneratedStory(data.story);
      reset();
      toastSuccess('Story generated successfully!');
    } catch (error) {
      toastError(`An unexpected error occured: ${error}`);
    }
  };

  return (
    <Box className='mx-auto max-w-[600px] space-y-6 p-2'>
      <Typography align='center' variant='h4'>
        Generate A Story
      </Typography>
      <form onSubmit={handleSubmit(handleGenerate)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name='character1'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Character 1'
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  error={!!errors.character1}
                  helperText={errors.character1?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name='character2'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Character 2'
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  error={!!errors.character2}
                  helperText={errors.character2?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name='relationship'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Relationship Between Characters'
                  variant='outlined'
                  color='secondary'
                  fullWidth
                  error={!!errors.relationship}
                  helperText={errors.relationship?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant='h6'>Events</Typography>
          </Grid>

          {fields.map((item, index) => (
            <Grid container size={{ xs: 12 }} spacing={1} key={item.id} alignItems='center'>
              <Grid size={{ xs: 10 }}>
                <Controller
                  name={`events.${index}.event`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Event ${index + 1}`}
                      variant='outlined'
                      color='secondary'
                      fullWidth
                      error={!!errors.events?.[index]}
                      helperText={errors.events?.[index]?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 2 }}>
                <IconButton color='error' onClick={() => remove(index)} disabled={fields.length === 1}>
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid size={{ xs: 12 }}>
            <Button color='secondary' variant='contained' startIcon={<AddCircle />} onClick={() => append({ event: '' })}>
              Add Event
            </Button>
            {errors.events && typeof errors.events.message === 'string' && (
              <Typography color='error' variant='body2' className='mt-1'>
                {errors.events.message}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12 }}>
            <LoadingButton
              loading={isSubmitting}
              disabled={!isValid}
              color='secondary'
              type='submit'
              variant='contained'
              fullWidth
            >
              Generate Story
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

      {generatedStory && (
        <Box ref={saveFormRef}>
          <SaveStoryForm setGeneratedStory={setGeneratedStory} generatedStory={generatedStory} />
        </Box>
      )}
    </Box>
  );
};

export default Page;
