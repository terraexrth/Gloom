import { httpClient, httpClientWithAuth } from "../client";

export const postLogin = async(request) =>{
	const response = await httpClient.post("api/login",{
		username: request.username,
		password: request.password,
	});
	return response.data;
}

export const authMe = async() =>{
	const response = await httpClientWithAuth.get("api/user/me")
	if(response.status === 403){
		return null;
	}
	return response.data
}

export const getUserById = async(id) =>{
	const response = await httpClientWithAuth.get(`api/user/who/${id}`)
	return response.data
}


