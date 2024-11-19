import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const PersonalDetails = ({ register, errors, nextStep }) => {
  return (
    <Box component="form" autoComplete="off">
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
      />
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />
       <TextField
        fullWidth
        label="Mobile"
        variant="outlined"
        margin="normal"
        {...register("mobile", { required: "Mobile is required", maxLength: { value: 10, message: "Max 10 Digits" }, minLength: { value: 10, message: "Min 10 Digits" } })}
        error={!!errors.mobile}
        helperText={errors.mobile ? errors.mobile.message : ""}
      />
      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={nextStep}
        className="w-full mt-4"
      >
        Next
      </Button>
    </Box>
  );
};

export default PersonalDetails;
