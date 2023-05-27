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
import LoadingNotif from "../../components/LoadingNotif";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useContext } from "react";
import { useHistoryReports } from "../../services/reports/useHistoryReports";
import { ReportsContext } from "../../services/reports/useReportsData";

const History = () => {
    const { reports } = useContext(ReportsContext);
    const { historyReports, isHistoryLoading } = useHistoryReports(reports);
    console.log("history: ", historyReports);
    const navigate = useNavigate();

    return (
        <>
            {isHistoryLoading ? (
                <LoadingNotif />
            ) : (
                <div>
                    <Header title="Reports History" />
                    <TableContainer
                        component={Box}
                        sx={{
                            marginTop: "20px",
                            border: "1px solid #dcdcdc",
                            height: "400px",
                            backgroundColor: "#f2f3f5",
                            borderRadius: "10px",
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Address</TableCell>
                                    <TableCell align="left">
                                        Contact Person
                                    </TableCell>
                                    <TableCell align="left">
                                        Contact Number
                                    </TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Action </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historyReports.map((report, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="left">
                                            {report.date}
                                        </TableCell>
                                        <TableCell align="left">
                                            {report.addresss}
                                        </TableCell>
                                        <TableCell align="left">
                                            {report.fname}
                                        </TableCell>
                                        <TableCell align="left">
                                            {report.con}
                                        </TableCell>
                                        <TableCell align="left">
                                            {report.status}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    navigate(
                                                        `/report-details/${report.userReportId}`
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
                </div>
            )}
        </>
    );
};

export default History;
