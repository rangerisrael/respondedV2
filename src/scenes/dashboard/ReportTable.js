import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Button,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// changes: filter table
const ReportTable = ({ data }) => {
    const navigate = useNavigate();
    return (
        <TableContainer
            component={Box}
            sx={{
                border: "1px solid #dcdcdc",
                height: "400px",
                backgroundColor: "#f2f3f5",
                borderRadius: "10px",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">id</TableCell>

                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="left">Contact Person</TableCell>
                        <TableCell align="left">Contact Number</TableCell>
                        <TableCell align="left">Action </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">
                                {row.userReportId}
                            </TableCell>

                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">{row.addresss}</TableCell>
                            <TableCell align="left">{row.fname}</TableCell>
                            <TableCell align="left">{row.con}</TableCell>
                            <TableCell align="left">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        navigate(
                                            `/report-details/${row.userReportId}`
                                        );
                                    }}
                                >
                                    <Typography fontSize="12px">
                                        View
                                    </Typography>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportTable;
