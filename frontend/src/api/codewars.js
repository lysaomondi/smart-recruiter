import axios from "axios";

const codewarsApi = axios.create({
  baseURL: "https://www.codewars.com/api/v1",
});

export const getUser = async (username) => {
  const response = await codewarsApi.get(`/users/${username}`);
  return response.data;
};

export const getCompletedChallenges = async (userId, page = 0) => {
  const response = await codewarsApi.get(
    `/users/${userId}/code-challenges/completed`,
    {
      params: { page },
    }
  );
  return response.data;
};

export const getAuthoredChallenges = async (userId) => {
  const response = await codewarsApi.get(
    `/users/${userId}/code-challenges/authored`
  );
  return response.data;
};

export const getCodeChallenge = async (challenge) => {
  const response = await codewarsApi.get(
    `/code-challenges/${challenge}`
  );
  return response.data;
};