import { useEffect, useState } from "react";
import { getYear, getMonth } from "../helper";

export const useAggregatedByTimeReports = (reports, selectedYear = 2023) => {
    const [monthlyReports, setMonthlyReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [annualReports, setAnnualReports] = useState([]);
    const [isTotalReportsLoading, setIsTotalReportLoading] = useState(false);

    //month aggregation
    useEffect(() => {
        setIsTotalReportLoading(true);
        const filteredReports = reports.filter((report) => {
            const year = getYear(report.date);
            return year == selectedYear;
        });

        setFilteredReports(filteredReports);
        setIsTotalReportLoading(false);
    }, [reports, selectedYear]);

    useEffect(() => {
        setIsTotalReportLoading(true);
        const updatedMonthly = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ].map((month) => ({ month: month, total: 0 }));

        filteredReports.forEach((reports) => {
            const month = getMonth(reports.date);
            updatedMonthly[month] = {
                ...updatedMonthly[month],
                total: updatedMonthly[month].total + 1,
            };
        });

        setMonthlyReports(updatedMonthly);
        setIsTotalReportLoading(false);

        return function cleanUp() {
            setMonthlyReports([]);
        };
    }, [reports, filteredReports]);

    //annually aggregation
    useEffect(() => {
        console.log("filtered reports: ", filteredReports);
        setIsTotalReportLoading(true);
        const accumulatedYears = [];
        reports.forEach((report) => {
            const year = getYear(report.date);
            accumulatedYears.push(year);
        });

        const uniqueYears = [...new Set(accumulatedYears)].sort((a, b) =>
            a > b ? 1 : a < b ? -1 : 0
        );
        const yearlyReports = uniqueYears.map((year) => ({
            year: year,
            total: 0,
        }));

        reports.forEach((report) => {
            const year = getYear(report.date);
            const index = year - Math.min(...uniqueYears);

            yearlyReports[index] = {
                ...yearlyReports[index],
                total: yearlyReports[index].total + 1,
            };
        });

        setAnnualReports(yearlyReports);
        setIsTotalReportLoading(false);

        return function cleanUp() {
            setAnnualReports([]);
        };
    }, [reports]);

    return { monthlyReports, annualReports, isTotalReportsLoading };
};
