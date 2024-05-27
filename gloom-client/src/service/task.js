import { httpClient,httpClientWithAuth } from "../client";

export const addTask = async (id,bodyRequest) => {
	const response = await httpClientWithAuth.post(`api/task/projects/${id}/tasks`,bodyRequest)
	return response.data
}

export const getTask = async(id) =>{
	try {
		const response = await httpClientWithAuth.get(`api/project/task/${id}`);
		return response.data;
	  } catch (error) {
		throw error; 
	  }
}

