import React from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Box, InputLabel } from '@mui/material';

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const AdditionalDetails = ({ register, errors, prevStep, selectDataProp ,onSubmit }) => {

    const updateState  = selectDataProp; 
  return (
    <Box component="form" autoComplete="off" onSubmit={onSubmit}>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="blood-group-label">Blood Group</InputLabel>
        <Select
          labelId="blood-group-label"
          label="Blood Group"
          defaultValue=""
          {...register("bloodGroup", { required: "Blood Group is required" })}
          error={!!errors.bloodGroup}
        >
          {bloodGroups.map((group, index) => (
            <MenuItem key={index} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
        {errors.bloodGroup && <p className="text-red-500">{errors.bloodGroup.message}</p>}
      </FormControl>
     
      <TextField
        fullWidth
        label="Age"
        variant="outlined"
        margin="normal"
        type="number"
        {...register("age", { required: "Age is required" })}
        error={!!errors.age}
        helperText={errors.age ? errors.age.message : ""}
      />
       <FormControl component="fieldset" margin="normal">
            {" "}
            <FormLabel component="legend">Gender</FormLabel>{" "}
            <RadioGroup row aria-label="gender" defaultValue="male">
              {" "}
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                onClick={() => updateState("gender","male" )}
              />{" "}
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                onClick={() =>
                  updateState("gender","female")
                }
              />{" "}
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                onClick={() =>
                  updateState(" gender","other")
                }
              />{" "}
            </RadioGroup>{" "}
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}{" "}
          </FormControl>
      <TextField
        fullWidth
        label="Address"
        variant="outlined"
        margin="normal"
        multiline
        {...register("address", { required: "Address is required" })}
        error={!!errors.address}
        helperText={errors.address ? errors.address.message : ""}
      />
      <TextField
        fullWidth
        label="Last Donate Date"
        variant="outlined"
        margin="normal"
        type="date"
        {...register("lastDonateDate")}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        size="large"
        type="submit"
        variant="contained"
        color="primary"
        className="w-full m-3"
      >
        Submit
      </Button>
      <div className='h-3' >

      </div>
      <Button
        size="large"
        variant="contained"
        color="inherit"
        className="w-full  "
        onClick={prevStep}
      >
        Back
      </Button>
    </Box>
  );
};

export default AdditionalDetails;
