import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';

import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from '@mui/icons-material/Send'

import { useFormik } from 'formik';



const validationSchema = yup.object({
  userId: yup.number().required("User id is required, and should be numerical"),
  title: yup.string().required("Title is required").trim(),
  body: yup.string().max(2000).trim().required("Write you life story"),
});


const ItemForm = ({ onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      userId: '',
      title: '',
      body: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit
  })

  return (
    <form onSubmit={formik.handleSubmit}> 
      <Box sx={{ display: 'flex', justifyContent: 'space-between',
        flexDirection: 'column'}}>
        <TextField
          label="User ID"
          name="userId"
          value={formik.values.userId}
          onChange={formik.handleChange}
          error={formik.touched.userId && Boolean(formik.errors.userId)}
          helperText={formik.touched.userId && formik.errors.userId}
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          variant="standard"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Please enter your secrets here: "
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
          multiline
          rows="10"
          sx={{ mb: 2 }}
        />
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => onCancel()}
              startIcon={<CancelIcon />}
            >
                Cancel
            </Button>
          </Grid>
          <Grid item>
            {/*
            <LoadingButton 
              variant="contained"
              type="submit"
              loading={loading}
              onClick={ () => {
                setLoading(true);
              }}
              loadingPosition="end"
              endIcon={<SendIcon />}
            >
            Add
            </LoadingButton>
            */
            }
            <Button 
              type="submit"
              variant="contained" 
              endIcon={<SendIcon />}
            >
                Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ItemForm;
