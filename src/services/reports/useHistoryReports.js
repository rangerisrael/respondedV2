import { useEffect, useState } from "react";

export const useHistoryReports = (reports) => {
    const [historyReports, sethistoryReports] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
    const [respondedCount, setRespondedCount] = useState(0);
    const [declinedCount, setDeclinedCount] = useState(0);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    useEffect(() => {
        setIsHistoryLoading(true);

        const evaluatedRep = reports.filter(
            (report) => report.status !== "pending"
        );

        const respondedReports = reports.filter(
            (report) => report.status == "responded"
        );
        const declinedReports = reports.filter(
            (report) => report.status == "declined"
        );

        sethistoryReports(evaluatedRep);
        setHistoryCount(evaluatedRep.length);
        setRespondedCount(respondedReports.length);
        setDeclinedCount(declinedReports.length);
        setIsHistoryLoading(false);
    }, [reports]);

    return {
        historyReports,
        historyCount,
        respondedCount,
        declinedCount,
        isHistoryLoading,
    };
};
