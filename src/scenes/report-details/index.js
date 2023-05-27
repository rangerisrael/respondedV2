import Map from "./Map";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useContext, useState } from "react";
import { ReportsContext } from "../../services/reports/useReportsData";
import { ref, set } from "firebase/database";
import { db } from "../../config/firebase";

const ReportDetails = () => {
    const { reports } = useContext(ReportsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [matchedData, setMatchedData] = useState(null);

    useEffect(() => {
        const match = reports.filter((report) => report.userReportId === id);
        console.log("matched: ", match);
        setMatchedData(match[0]);
    }, [reports]);

    const setReportStatus = (status) => {
        const reportRef = ref(
            db,
            `Incoming report/${matchedData.reportId}/${matchedData.userReportId}`
        );
        const updateData = { ...matchedData, status: status };
        set(reportRef, updateData)
            .then(() => {
                alert("Updated");
            })
            .catch((err) => alert("Error on updating"));
    };

    return (
        <>
            {!matchedData ? (
                "loading"
            ) : (
                <div>
                    <Button
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        back to dashboard
                    </Button>

                    <Header
                        title="Report Details"
                        subtitle={
                            matchedData.status !== "pending"
                                ? matchedData.status
                                : null
                        }
                    />

                    <Typography>{`Report ID: ${matchedData.userReportId}`}</Typography>
                    <Box display="flex" gap={4}>
                        <div>
                            <Typography fontSize="14px">{`Reporter Name:  ${matchedData.fname}`}</Typography>
                            <Typography fontSize="14px">{`Address:  ${matchedData.addresss}`}</Typography>
                        </div>
                        <Box>
                            <Typography fontSize="14px">{`Reporter Contact:  ${matchedData.con}`}</Typography>
                            <Typography fontSize="14px">{`Date:  ${matchedData.date}`}</Typography>
                        </Box>
                    </Box>
                    <Map reportData={matchedData} />
                    {matchedData.status == "pending" && (
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button
                                sx={{
                                    backgroundColor: "#c40223",
                                    color: "#fffff",
                                }}
                                variant="contained"
                                onClick={() => setReportStatus("declined")}
                            >
                                Decline
                            </Button>
                            <Button
                                sx={{
                                    background: "#48A14D",
                                    color: "white",
                                }}
                                variant="contained"
                                onClick={() => setReportStatus("responded")}
                            >
                                Respond
                            </Button>
                        </Box>
                    )}
                </div>
            )}
        </>
    );
};

export default ReportDetails;
