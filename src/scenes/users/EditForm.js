import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box,
} from "@mui/material";

import { useState } from "react";
import { set, ref } from "firebase/database";
import { db } from "../../config/firebase";
import CloseIcon from "@mui/icons-material/Close";
const EditForm = ({ data, open, setOpen, setData }) => {
    const handleChange = (e) => {
        setData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = () => {
        const userRef = ref(db, `Registered Users/${data.id}`);
        set(userRef, data)
            .then(() => {
                alert("Updated");
            })
            .catch((err) => alert("Error on updating"));
    };

    return data ? (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <Box display="flex" justifyContent="space-between">
                <DialogTitle>Edit User</DialogTitle>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <DialogContentText>Edit User</DialogContentText>
                <form>
                    <Box
                        width="400px"
                        display="flex"
                        flexDirection="column"
                        gap={1}
                    >
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="fame"
                            value={data.fname}
                            name="fname"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="address"
                            value={data.address}
                            name="address"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="birthdate"
                            value={data.dob}
                            name="dob"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="ename1"
                            value={data.ename1}
                            name="ename1"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="ename2"
                            value={data.ename1}
                            name="ename2"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="enum1"
                            value={data.enum1}
                            name="enum1"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="enum2"
                            value={data.enum2}
                            name="enum2"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="gender"
                            value={data.gender}
                            name="gender"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="materials"
                            value={data.materials}
                            name="materials"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="number"
                            value={data.number}
                            name="number"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="pass"
                            value={data.pass}
                            name="pass"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            autoComplete="nope"
                            variant="outlined"
                            label="usertype"
                            value={data.usertype}
                            name="usertype"
                            onChange={handleChange}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{ padding: "10px" }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    ) : (
        ""
    );
};

export default EditForm;
