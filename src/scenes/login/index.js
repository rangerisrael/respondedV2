import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { db,logInAuth, logOutAuth } from "../../config/firebase";
import { ref, get } from "firebase/database";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // const user = useCheckUser();
    const navigate = useNavigate();
    const [pass, setPass] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [invalidUsername, setInvalidEmail] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);

    const handlePass = (e) => {
        setPass(e.target.value);
    };

    const [email, setEmail] = useState("");
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        setErr("");
        setInvalidEmail(false);
        setInvalidPass(false);
        e.preventDefault();
        if (!email || !pass) {
            setInvalidEmail(!email ? true : false);
            setInvalidPass(!pass ? true : false);
            setErr("Incomplete Inputs.");
            return;
        }

        //authenticating

        const userRef = ref(db, "admin");
        logInAuth(email, pass).then(() => {
            get(userRef)
            .then((snapshot) => {
                const users = snapshot.val();
                let foundUser = null;

                //find user by ename1 or ename1 props
                for (let userId in users) {
                    if (users[userId].email === email) {
                        foundUser = users[userId];
                        break;
                    }
                }
                //verifying user
                if (!foundUser) {
                    logOutAuth();
                    setErr("User does not exist");
                    return;
                }
                const validUser = foundUser.password === pass;
                if (!validUser) {
                    logOutAuth();
                    setErr("Wrong Credentials");
                    return;
                } else {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }).catch(e => {
            console.log(e.message);
            setErr("Login error");
        })
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100vh"
            backgroundColor="#fcfcfc"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                <Typography variant="h4" color="#404040">
                    Log In
                </Typography>

                <form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        width="300px"
                        gap={2}
                    >
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={handleEmail}
                        />
                        <TextField
                            fullWidth
                            autoComplete="new-password"
                            type="password"
                            error={invalidPass}
                            label="Password"
                            variant="outlined"
                            value={pass}
                            onChange={handlePass}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ padding: "10px" }}
                            disabled={!email || !pass}
                        >
                            Submit
                        </Button>
                        {err && (
                            <Typography
                                color="red"
                                textAlign="center"
                                fontSize="14px"
                            >
                                {err}
                            </Typography>
                        )}
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
