import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../../config/firebase";

import EditForm from "./EditForm";
import { useUserList } from "../../services/users/useUserList";



const usersRef = ref(db, "Registered Users");
const Users = () => {
    const { data } = useUserList(usersRef);
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    const editUser = (row) => {
        const matchUser = data.filter((d) => d.id === row.id);
        setSelected(matchUser[0]);
        setOpen(true);
    };

    const deleteUser = (row) => {
        const deleteUserRef = ref(db, `Registered Users/${row.id}`);
        remove(deleteUserRef)
            .then(() => alert("Deleted"))
            .catch((err) => alert("Error occured on deleting."));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100, editable: true },
        {
            field: "fname",
            headerName: "Name",
            width: 80,
            editable: true,
        },
        {
            field: "ename1",
            headerName: "Username",
            width: 100,
            editable: true,
        },
        {
            field: "address",
            headerName: "Address",
            width: 140,
            editable: true,
        },
        {
            field: "dob",
            headerName: "Birthdate",
            flex: 1,
            editable: true,
        },
        {
            field: "number",
            headerName: "Contact",
            flex: 1,
            editable: true,
        },

        {
            field: "usertype",
            headerName: "Role",
            sortable: false,
            flex: 1,
            editable: true,
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box display="flex" gap={1}>
                        <div
                            onClick={() => {
                                editUser(row);
                            }}
                        >
                            <IconButton children={<EditOutlinedIcon />} />
                        </div>
                        <div
                            onClick={() => {
                                deleteUser(row);
                            }}
                        >
                            <IconButton
                                children={<DeleteOutlineOutlinedIcon />}
                            />
                        </div>
                    </Box>
                );
            },
        },
    ];

    return (
        <div>
            <Typography variant="h5" component="h1">
                Users
            </Typography>
            <Typography component="h2" sx={{ fontSize: "16px" }}>
                Manage Users
            </Typography>
            <Box sx={{ height: "400px", width: "100%", marginTop: "20px" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{
                        backgroundColor: "#f2f3f5",
                    }}
                />
            </Box>

            <EditForm
                data={selected}
                open={open}
                setOpen={setOpen}
                setData={setSelected}
                usersRef={usersRef}
            />
        </div>
    );
};
export default Users;
