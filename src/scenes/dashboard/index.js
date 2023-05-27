import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import { Box, Button } from "@mui/material";
import ReportTable from "./ReportTable";
import LoadingNotif from "../../components/LoadingNotif";
import { ReportsContext } from "../../services/reports/useReportsData";
import { useIncomingReports } from "../../services/reports/useIncomingReports";
import { useHistoryReports } from "../../services/reports/useHistoryReports";
import StatCard from "../../components/StatCard";
import ReportIcon from "@mui/icons-material/Report";
import HistoryIcon from "@mui/icons-material/History";

import NotifyUser from "./dialog";
import { isEmpty } from "lodash";
import { useUserList } from "../../services/users/useUserList";

import { ref } from 'firebase/database';
import { db } from '../../config/firebase';


const dbRef = ref(db, 'Registered Users');

const Dashboard = () => {
    const { reports } = useContext(ReportsContext);
    const { incomingReports, incomingCount, isReportLoading } =
        useIncomingReports(reports);
    const { historyCount, isHistoryLoading } = useHistoryReports(reports);
		const { data } = useUserList(dbRef);





    return (
			<>
				{!reports || isReportLoading || isHistoryLoading ? (
					<LoadingNotif />
				) : (
					<Box display='flex' flexDirection='column' gap={1}>
						<Header title='Dashboard' />
						<Box display='flex' height='250' gap={2}>
							<StatCard
								icon={<ReportIcon fontSize='large' sx={{ color: '#ffffff' }} />}
								countLabel='Incoming Reports'
								count={incomingCount}
								bgColor='#c0392b'
							/>
							<StatCard
								icon={<HistoryIcon fontSize='large' sx={{ color: '#ffffff' }} />}
								countLabel='Reports History'
								count={historyCount}
								bgColor='#3c73a8'
							/>
						</Box>
						<Box mt='20px' display='flex' flexDirection='column' gap={2}>
							<Header title='Incoming Reports' />
							<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
								{!isEmpty(data) && <NotifyUser />}
							</Box>
							<ReportTable data={incomingReports} />
						</Box>
					</Box>
				)}
			</>
		);
};

export default Dashboard;
