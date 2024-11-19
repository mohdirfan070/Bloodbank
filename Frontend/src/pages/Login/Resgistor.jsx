import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Select, InputLabel } from "@mui/material";

const bloodGroups = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
import { toast } from "react-toastify";
const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    expires = "; expires="+172800000;
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

import baseurl from "../../assets/url";
import MultiStepForm from "./MultiStepForm";
const registorFunc = async (data , func ) =>{
  try {
    // console.log(data)
      const result  = await axios.post(baseurl+"/registor", data , {withCredentials:true});
      if(!result.data.status) throw result;
      notify(result.data.msg, "success", "light", 3000);
      // setCookie('isLogin', true);
      func('/login');
  } catch (error) {
    // console.log(error);
    notify(error.response.data.msg , "error" , "light" , 3000 )
  }
}

const Registor = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState("donor");
  const [selectData, setSelectData] = useState({
    gender: "male",
    healthHistory: "no",
  });


  const onSubmit =async (data) => {
        // console.log({ ...data, ...selectData,user});
          await registorFunc({ ...data, ...selectData , user}, navigate);
      };
  return (
    <Box className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6  font1">Resgistor</h2>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Select Role:
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue="donor"
        >
          <FormControlLabel
            onClick={(e) => setUser(e.target.value)}
            value="donor"
            control={<Radio />}
            label="Donor"
          />
          <FormControlLabel
            onClick={(e) => setUser(e.target.value)}
            value="user"
            control={<Radio />}
            label="User/Org/Hospital"
          />
          <FormControlLabel
            onClick={(e) => setUser(e.target.value)}
            value="admin"
            control={<Radio />}
            label="Admin"
          />
        </RadioGroup>
      </FormControl>

      {user == "donor" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />{" "}
          <FormControl fullWidth variant="outlined" margin="normal">
            {" "}
            <InputLabel id="blood-group-label">Blood Group</InputLabel>{" "}
            <Select
              labelId="blood-group-label"
              label="Blood Group"
              defaultValue=""
              {...register("bloodGroup", {
                required: "Blood Group is required",
              })}
              error={!!errors.bloodGroup}
            >
              {" "}
              {bloodGroups.map((group, index) => (
                <MenuItem key={index} value={group}>
                  {group}
                </MenuItem>
              ))}{" "}
            </Select>{" "}
            {errors.bloodGroup && (
              <p className="text-red-500">{errors.bloodGroup.message}</p>
            )}{" "}
          </FormControl>
          <TextField
            fullWidth
            label="Mobile"
            variant="outlined"
            margin="normal"
            {...register("mobile",  { required: "Mobile is required" , maxLength:{value:10 , message:"Max 10 Digits"} , minLength:{value:10 , message : "Min 10 Digits"} }  )}
            error={!!errors.mobile}
            helperText={errors.mobile ? errors.mobile.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Age"
            variant="outlined"
            margin="normal"
            type="number"
            {...register("age", { required: "Age is required" })}
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />{" "}
          <FormControl component="fieldset" margin="normal">
            {" "}
            <FormLabel component="legend">Gender</FormLabel>{" "}
            <RadioGroup row aria-label="gender" defaultValue="male">
              {" "}
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                onClick={() => setSelectData({ ...selectData, gender: "male" })}
              />{" "}
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
                onClick={() =>
                  setSelectData({ ...selectData, gender: "female" })
                }
              />{" "}
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                onClick={() =>
                  setSelectData({ ...selectData, gender: "other" })
                }
              />{" "}
            </RadioGroup>{" "}
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}{" "}
          </FormControl>{" "}
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            multiline
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Last Donate Date"
            variant="outlined"
            margin="normal"
            type="date"
            
            {...register("lastDonateDate" ,{max : new Date(Date.now()).getTime()} )}
            InputLabelProps={{ shrink: true }}
          />{" "}

          {
          selectData.gender=="female" && <TextField
            fullWidth
            label="Menstrual Start Date "
            variant="outlined"
            margin="normal"
            type="date"
            {...register("menstrualDate ")}
            InputLabelProps={{ shrink: true }}
          />
        } 
          <FormControl component="fieldset" margin="normal">
            {" "}
            <FormLabel component="legend">
              Health History( if any)
            </FormLabel>{" "}
            <RadioGroup row aria-label="healthHistory" defaultValue="no">
              {" "}
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
                onClick={() =>
                  setSelectData({ ...selectData, healthHistory: "yes" })
                }
              />{" "}
              <FormControlLabel
                value="no"
                onClick={() =>
                  setSelectData({ ...selectData, healthHistory: "no" })
                }
                control={<Radio />}
                label="No"
              />{" "}
            </RadioGroup>{" "}
            {errors.healthHistory && (
              <p className="text-red-500">{errors.healthHistory.message}</p>
            )}{" "}
          </FormControl>{" "}
          <Button  size="large"
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mt-4"
          >
            {" "}
            Submit{" "}
          </Button>
        </form>
        // <MultiStepForm/>
      )}
      {user == "user" && (
        <form onSubmit={handleSubmit(onSubmit)}>
           <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Organization Name"
            variant="outlined"
            margin="normal"
            {...register("organizationName", { required: "Organization Name is required" })}
            error={!!errors.organizationName}
            helperText={errors.organizationName ? errors.organizationName.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Mobile"
            variant="outlined"
            margin="normal"
            {...register("mobile",  { required: "Mobile is required" , maxLength:{value:10 , message:"Max 10 Digits"} , minLength:{value:10 , message : "Min 10 Digits"} })}
            error={!!errors.mobile}
            helperText={errors.mobile ? errors.mobile.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            multiline
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ""}
          />{" "}
          <Button  size="large"
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mt-4"
          >
            {" "}
            Submit{" "}
          </Button>
        </form>
      )}
       {user == "admin" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />{" "}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />{" "}
            <TextField
              fullWidth
              label="Mobile"
              variant="outlined"
              margin="normal"
              {...register("mobile", { required: "Mobile is required" , maxLength:{value:10 , message:"Max 10 Digits"} , minLength:{value:10 , message : "Min 10 Digits"} })}
              error={!!errors.mobile}
              helperText={errors.mobile ? errors.mobile.message : ""}
            />{" "}
         <TextField
            fullWidth
            label="Secret Key"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("secretKey", { required: "secretKey is required" })}
            error={!!errors.secretKey}
            helperText={errors.secretKey ? errors.secretKey.message : ""}
          />{" "}
          <Button  size="large"
            type="submit"
            variant="contained"
            color="primary"
            className="w-full mt-4"
          >
            {" "}
            Submit{" "}
          </Button>
        </form>
      )}

      <div>
        <Link to={"/"} className="text-lg mb-6  ">
          Click here to
          <span className="font1 text-blue-600 font-semibold"> Login</span>
        </Link>
      </div>
    </Box>
  );
};

export default Registor;
