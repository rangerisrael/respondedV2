import axios from "axios";

export function smsApi(phone, message,cb) {

    axios
			.post(`${process.env.REACT_APP_URL}/notify-users`, {
				phone: phone,
				message: message,
			})
			.then((response) => {
				const dataReturn = {
					data: response.data,
					status: true,
				};

				return cb(dataReturn);
			})
			.catch(function (error) {
				const dataReturn = {
					data: error,
					status: false,
				};

				return cb(dataReturn);
			});




}