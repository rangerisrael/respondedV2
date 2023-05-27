import React, { useState, useContext, useRef } from "react";
import { useAggregatedByTimeReports } from "../../services/reports/useAggregatedByTimeReport";
import { ReportsContext } from "../../services/reports/useReportsData";
import Header from "../../components/Header";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Box,
    Button,
} from "@mui/material";
import BarChart from "./BarChart";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportPdfChart } from "./utils";

const Reports = () => {
    const { reports } = useContext(ReportsContext);
    const [selectedYear, setSelectedYear] = useState(2023);
    const { monthlyReports, annualReports, isTotalReportsLoading } =
        useAggregatedByTimeReports(reports, selectedYear);

    const handleChange = (e) => {
        setSelectedYear(e.target.value);
    };

    return (
        <>
            {isTotalReportsLoading ? (
                "loading..."
            ) : (
                <Box width="100%" display="flex" flexDirection="column" gap={1}>
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Header title="Yearly Reports" />
                        <Button
                            variant="contained"
                            onClick={() => {
                                exportPdfChart(
                                    "yearly-chart-id",
                                    "Yearly Reports"
                                );
                            }}
                        >
                            <FileDownloadIcon />
                            Download
                        </Button>
                    </Box>
                    <Box
                        height="400px"
                        p="10px"
                        backgroundColor="#f2f3f5"
                        border={1}
                        borderColor="#d3d3d3"
                        borderRadius="10px"
                        id="yearly-chart-id"
                    >
                        <BarChart data={annualReports} index="year" />
                    </Box>
                    <Header title="Monthly Reports" />
                    <Box
                        width="100%"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-end"
                    >
                        <FormControl
                            variant="filled"
                            sx={{ m: 1, width: "150px" }}
                        >
                            <InputLabel id="demo-simple-select-filled-label">
                                Year
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={selectedYear}
                                onChange={handleChange}
                            >
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            sx={{
                                height: "40px",
                                mb: "10px",
                            }}
                            variant="contained"
                            onClick={() => {
                                exportPdfChart(
                                    "monthly-chart-id",
                                    "Monthly Reports"
                                );
                            }}
                        >
                            <FileDownloadIcon />
                            Download
                        </Button>
                    </Box>
                    <Box
                        id="monthly-chart-id"
                        height="350px"
                        p="10px"
                        backgroundColor="#f2f3f5"
                        border={1}
                        borderColor="#d3d3d3"
                        borderRadius="10px"
                    >
                        <BarChart data={monthlyReports} index="month" />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default Reports;
