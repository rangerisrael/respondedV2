import "./index.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import Logout from "./scenes/logout";
import Users from "./scenes/users";
import Layout from "./scenes/global";
import ReportDetails from "./scenes/report-details";
import History from "./scenes/report-history";
import {
    ReportsContext,
    useReportsData,
} from "./services/reports/useReportsData";
import Reports from "./scenes/reports";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./config/theme";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {styled} from '@mui/material';

export const StyledToastContainer = styled(ToastContainer)`
	.Toastify__toast {
		min-height: 50px;
	}
`;

function App() {
    const { reports, setReports } = useReportsData();



    return (
			<ThemeProvider theme={theme}>
				<ReportsContext.Provider value={{ reports, setReports }}>
					<div className='app'>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/logout' element={<Logout />} />
							<Route path='/' element={<Layout />}>
								<Route index element={<Dashboard />} />
								<Route path='users' element={<Users />} />
								<Route path='reports' element={<Reports />} />
								<Route path='report-history' element={<History />} />
								<Route path='report-history/report-details/:id' element={<ReportDetails />} />
								<Route path='report-details/:id' element={<ReportDetails />} />
							</Route>
						</Routes>
						<StyledToastContainer/>
					</div>
				</ReportsContext.Provider>
			</ThemeProvider>
		);
}

export default App;
