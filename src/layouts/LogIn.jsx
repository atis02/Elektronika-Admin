import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Components/db/Redux/reducers/ReduxSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AxiosInstance, {
  BASE_URL,
} from "../Components/db/Redux/api/AxiosHelper";

// import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [data, setData] = useState();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length <= 0 || password.trim().length <= 0) {
        toast.error("Dogry maglumatyňyzy giriziň!");
      } else {
        setLoading(true);
        const body = {
          email,
          password,
        };
        console.log(body);

        const response = await AxiosInstance.post(
          `${BASE_URL}user/login`,
          body
        );
        console.log(response.data);

        const user = response.data?.user;
        const token = response.data?.jsonwebt;

        // dispatch(loginSuccess({ user, token }));
        if (response.status === 200) {
          localStorage.setItem("token", JSON.stringify(response.data));
          toast.success("Successfully logged in!");
          setTimeout(() => navigate("/"), 1000);
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <Box bgcolor="#141414" height="100vh">
      <ToastContainer />
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        {/* <Stack width="40%" maxHeight="100vh" backgroundColor="#3763f5">
          <img
            src="/images/login (2).png"
            style={{
              width: "100%",

              height: "50%",
            }}
            alt=""
          />
          <Typography
            textAlign="center"
            color="#fff"
            fontWeight="400"
            fontSize={55}
            position="absolute"
            top="50%"
            right="71%"
            fontFamily="Montserrat"
          >
            ÄLEM DOC
          </Typography>
          <img
            src="/images/login (1).png"
            style={{
              width: "100%",
              height: "50%",
            }}
            alt=""
          />
        </Stack> */}
        {/* <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="/images/logo.png"
            style={{
              width: "30%",
              height: "70%",
            }}
            alt=""
          />
        </Stack> */}
        <Stack
          direction="column"
          alignItems="center"
          // height="100vh"
          justifyContent="flex-start"
          width="100%"
        >
          <Stack
            width={{ lg: "31%", md: "41%", sm: "61%", xs: "90%" }}
            height={430}
            bgcolor="#262626"
            // boxShadow="0px 0px 22px 3px rgba(168,168,168,1)"
            // border="1px solid rgba(168,168,168,1)"
            justifyContent="flex-start"
            spacing={3}
            p={2}
            borderRadius="15px"
            alignItems="center"
            border="1px solid #555555"
          >
            <Stack
              width="90%"
              height="14%"
              alignItems="center"
              justifyContent="center"
            >
              <img
                src="/admin/images/logo.png"
                style={{
                  width: "70%",
                  height: "70%",
                  borderRadius: "10px",
                }}
                alt=""
              />
            </Stack>
            <Typography
              mb="10px"
              fontSize="30px"
              fontFamily="Montserrat"
              fontWeight="600"
              textAlign="center"
              ml={3}
              color="#efefef"
            >
              Giriş
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "20px",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Login"
                type="text"
                variant="outlined"
                fullWidth
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  sx: {
                    color: "#efefef", // Set the label color
                  },
                }}
                sx={{
                  transition: "all ease-in-out 0.2s",
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "20px",
                    border: "1px solid #555555", // Default border
                    "&:hover": {
                      borderColor: "#abcdef", // Border color on hover
                    },
                    "&.Mui-focused": {
                      borderColor: "#123456", // Border color when focused
                      boxShadow: "0 0 5px #123456", // Optional focus shadow
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#efefef", // Input text color
                  },
                  // backgroundColor: "#fff",
                  outline: "none",
                  boxShadow: "none",
                }}
              />
              {/* <TextField
                id="outlined-basic"
                label="Açar söz"
                type="text"
                name="password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px", // Set the border radius here
                  },
                  "& .MuiOutlinedInput-input": {
                    fontFamily: "Montserrat", // Apply font styling to the input
                  },
                }}
              /> */}
              {/* <TextField
                name="password"
                label="Açar söz"
                fullWidth
                variant="outlined"
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#efefef" }} />
                        ) : (
                          <Visibility sx={{ color: "#efefef" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    color: "#efefef", // Set the label color
                  },
                }}
                sx={{
                  // width: { lg: "100%", md: "100%", sm: "90%", xs: "90%" },
                  transition: "all ease-in-out 0.2s",
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "100px",
                    // border: "1px solid #efefef",
                  },
                  // backgroundColor: "#fff",
                  height: "60px",
                  color: "#efefef",
                  outline: "none",
                  boxShadow: "none",
                }}
              /> */}
              <TextField
                name="password"
                label="Açar söz"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ color: "#efefef" }} />
                        ) : (
                          <Visibility sx={{ color: "#efefef" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  sx: {
                    color: "#efefef", // Set the label color
                  },
                }}
                sx={{
                  transition: "all ease-in-out 0.2s",
                  "& .MuiOutlinedInput-root": {
                    height: "60px",
                    borderRadius: "20px",
                    border: "1px solid #555555", // Default border
                    "&:hover": {
                      borderColor: "#abcdef", // Border color on hover
                    },
                    "&.Mui-focused": {
                      borderColor: "#123456", // Border color when focused
                      boxShadow: "0 0 5px #123456", // Optional focus shadow
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "#efefef", // Input text color
                  },
                  // backgroundColor: "#fff",
                  outline: "none",
                  boxShadow: "none",
                }}
              />

              <Stack
                direction="row"
                alignItems="end"
                justifyContent="flex-end"
                width="100%"
              >
                {/* <Stack direction="row" spacing={2}>
                  <Link
                    to="/"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    to="/"
                    style={{
                      color: "#00159D",
                      fontSize: 15,
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Registration
                  </Link>
                </Stack> */}

                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#151515",
                    color: "#fff",
                    "&:hover": { background: "black" },
                    fontFamily: "Montserrat",
                    height: "55px",
                    width: "160px",
                    borderRadius: "100px",
                    border: "1px solid #555555",
                  }}
                >
                  {loading ? (
                    <Stack alignItems="center">
                      <CircularProgress sx={{ color: "#fff" }} />
                    </Stack>
                  ) : (
                    "Girmek"
                  )}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
