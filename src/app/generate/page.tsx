'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Controller, FieldValues, useFieldArray, useForm } from 'react-hook-form';

import { storySchema } from '../../lib/formSchemas';
import { toastSuccess } from '../../lib/toastUtils';

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
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(storySchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'events',
  });

  const onSubmit = (data: FieldValues) => {
    toastSuccess('Form submitted');
    console.log('Form Data:', data);
  };

  return (
    <Box className='mx-auto max-w-[600px] space-y-6 p-2'>
      <Typography align='center' variant='h4'>
        Generate A Story
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Typography variant='h6'>Events</Typography>
          </Grid>

          {fields.map((item, index) => (
            <Grid container item xs={12} spacing={1} key={item.id} alignItems='center'>
              <Grid item xs={10}>
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
              <Grid item xs={2}>
                <IconButton color='error' onClick={() => remove(index)} disabled={fields.length === 1}>
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button color='secondary' variant='contained' startIcon={<AddCircle />} onClick={() => append({ event: '' })}>
              Add Event
            </Button>
            {errors.events && typeof errors.events.message === 'string' && (
              <Typography color='error' variant='body2' className='mt-1'>
                {errors.events.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button disabled={!isValid} color='secondary' type='submit' variant='contained' fullWidth>
              Generate Story
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Page;
