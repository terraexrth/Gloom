import axios from 'axios'
import Cookies from 'js-cookie'

const httpClient = axios.create({
	baseURL:`${process.env.REACT_APP_SERVER_URL}`,
	timeout: 10000,
})

const httpClientWithAuth = axios.create({
	baseURL:`${process.env.REACT_APP_SERVER_URL}`,
	timeout: 10000,
	headers: {
		Authorization: `Bearer ${Cookies.get("accessToken")}`,
		"Content-Type":"application/json",
	}
})

export {httpClient, httpClientWithAuth}
