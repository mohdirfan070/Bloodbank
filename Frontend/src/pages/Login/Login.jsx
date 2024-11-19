import React, { useState , useContext } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import baseurl from '../../assets/url';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";

const notify = (msg, type, theme, autoClose) => {
  toast(msg, { type, theme, autoClose });
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
// Set a cookie with name 'username' and value 'JohnDoe'
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    expires = "; expires="+172800000;
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};



const loginFunc = async(data , func , updateSetUserRole)=>{



    try {

      const result = await axios.post(baseurl+"/login", data , {withCredentials:true});
      if(!result.data.status) throw result;
      // console.log(result)
      // setCookie('isLogin', true);
      updateSetUserRole(getCookie("role"));
      notify(result.data.msg, "success", "light", 3000);
      func('/');
    } catch (error) {
      // console.log(error)
        notify(error.response.data.msg , "error" , "light" , 3000 )
    }
}



const Login = () => {
  const {userRole , updateSetUserRole } = useContext(userContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [user, setUser] = useState("donor");
  const onSubmit =async(data) => {
    // console.log({...data,user});
    // Handle login logic here
    await loginFunc({...data,user} ,navigate , updateSetUserRole);
  };

  //   return (
  //   );
  return (
    <Box className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6  font1">Login</h2>

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
            value="org"
            control={<Radio />}
            label="User/Org/Hospital"
          />
          <FormControlLabel
            onClick={(e) => setUser(e.target.value)}
            value="admin"
            control={<Radio />}
            label="admin"
          />
        </RadioGroup>
      </FormControl>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          type="email"
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
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 Characters" },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className="w-full  mt-4  "
        >
          Login
        </Button>
      </form>
      <Link to={"/registor"} className="text-lg mb-6 ">
        Click here to{" "}
        <span className="font1 text-blue-600 font-semibold">Register</span>
      </Link>
    </Box>
  );
};

export default Login;
