import { httpClient, httpClientWithAuth } from "../client";

export const sendInvite = async (bodyRequest) => {
  try {
    const response = await httpClientWithAuth.post(
      "api/invite/send",
      bodyRequest
    );

    return response;
  } catch (error) {
    if (error.reponse) {
      return error.response;
    }
    throw error;
  }
};

export const getInvite = async (userId) => {
  const response = await httpClientWithAuth.get("api/invite/get", {
    params: { userId },
  });
  return response.data;
};

export const getMember = async (projectId) => {
  const response = await httpClientWithAuth.get("api/invite/get/pending", {
    params: { projectId },
  });
  return response.data;
};

export const subscribeToNotifications = (userId, onNotificationReceived) => {
  const eventSource = new EventSource(
    `${process.env.REACT_APP_SERVER_URL}/api/invite/notification?userId=${userId}`
  );

  eventSource.onmessage = (event) => {
    const newNotifications = JSON.parse(event.data);
    onNotificationReceived(newNotifications);
  };

  eventSource.onerror = (error) => {
    console.error("EventSource error:", error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
};

export const updateInvite = async (bodyRequest) => {
  const response = await httpClientWithAuth.put(
    "api/invite/update",
    bodyRequest
  );

  return response;
};
