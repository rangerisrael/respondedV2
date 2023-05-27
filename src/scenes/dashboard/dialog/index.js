import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SendIcon from '@mui/icons-material/Send';
import { Box, CircularProgress } from '@mui/material';
import { isEmpty } from 'lodash';
import { isBoolean } from 'lodash';
import { smsApi } from '../api';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref } from 'firebase/database';
import { db } from '../../../config/firebase';
import { useUserList } from '../../../services/users/useUserList';

  
const dbRef = ref(db, 'Registered Users');
export default function NotifyUser() {
	const [open, setOpen] = React.useState(false);
	const [active, setActive] = React.useState(false);
	const [error, setError] = React.useState('');
	const [errorActive, setErrorActive] = React.useState('');
	const [input, setInput] = React.useState('');
	const { data } = useUserList(dbRef);


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
    setActive(false);
	  setErrorActive(true);
		setError('');
		setInput('');
	};

  const handleSend = () => {
			if(isEmpty(input)) {
					setError('Message cannot be empty');
			}
			if(input.length > 10) {
				setActive(true);
				setErrorActive(false);

				let sendMsg = [];
				// eslint-disable-next-line array-callback-return
				data.map((res) => {
					sendMsg.push(res.number);
				});

			const reqMobile = sendMsg.join(',');
				smsApi(reqMobile, input,(res)=>{

			

					if (res.status === true) {
						
						toast.success('Message sent successfully', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'colored',
						});
						handleClose();
					}
					else{
						setActive(false);
						toast.error('Message failed to send', {
							position: 'top-right',
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'colored',
						});

					}
				});

				

			}
			else{
				if (isBoolean(errorActive) === true || !isEmpty(error)) {
					setErrorActive(true);
				}
			}

  }

	const onMessage = (e) => {

		if (e.target.value.length < 10 && !isEmpty(e.target.value)){
			setError('Message must be at least 10 characters');
			setInput('');
		}
	 else {
			setInput(e.target.value);
			setError('');
		}


	}

	return (
		<div>
			<Button variant='contained' onClick={handleClickOpen}>
				Notify All Users &nbsp; <SendIcon />
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Notify all users</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<strong>Remider:</strong> This will send a notification to all users .
					</DialogContentText>
					<TextField
						placeholder='Enter message here'
						multiline
						rows={2}
						maxRows={4}
						autoFocus
						margin='dense'
						id='name'
						label='Send a message'
						type='email'
						fullWidth
						variant='standard'
						helperText={!isEmpty(error) ? error : ''}
						onChange={onMessage}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					{!active ? (
						<Button variant='contained' onClick={handleSend}>
							Send &nbsp; <SendIcon />
						</Button>
					) : (
						<Box sx={{ display: 'flex' }}>
							<CircularProgress sx={{ width: '30px', height: '30px' }} />
						</Box>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
