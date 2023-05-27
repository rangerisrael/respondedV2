import { createContext, useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import { parseResult, parseReports } from "../helper";
export const ReportsContext = createContext({});

const reportRef = ref(db, "Incoming report");

export const useReportsData = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        onValue(reportRef, (snapshot) => {
            const data = snapshot.val();
            const parsedData = parseReports(data);
            const parsedReport = parseReports(data);
            console.log("not parsed: ", data);
            console.log("parsed: ", parsedData);
            console.log("parsed report: ", parsedReport);

            setReports(parsedData);
            setIsLoading(false);
        });
    }, []);

    return { reports, setReports, isLoading };
};
