import { httpClient, httpClientWithAuth } from "../client";

export const getProjects = async () => {
  const response = await httpClientWithAuth.get("api/projects/");
  return response.data;
};

export const getProjectById = async (id,userId) => {
  const response = await httpClientWithAuth.get(`api/project/${id}`, {
    headers: { "User-ID": userId },
  });
  return response.data;
};

export const getUserProject = async (id,userId) => {
  const response = await httpClientWithAuth.get(`api/project/user/${id}`,userId);

  return response.data;
};

export const createProject = async (bodyRequest) => {
  const response = await httpClientWithAuth.post("api/addProjects", bodyRequest);

  return response.data;
};

export const deleteProject = async (id, name) => {
  const encodedName = encodeURIComponent(name);
  const response = await httpClient.delete(`api/project/${id}/${encodedName}`);
  return response.data;
};
