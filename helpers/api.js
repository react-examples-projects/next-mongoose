import axios from "axios";

const fetcher = axios.create({
  baseURL: "/api/timestamp",
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.response.use(
  (res) => res.data?.data || {},
  (err) => Promise.reject(err)
);

export const getTimestamps = () => fetcher.get();

export const createTimestamp = (data) => fetcher.post("", data);

export const editTimestamp = (id, data) => fetcher.put(`/${id}`, data);

export const deleteTimestamp = (id) => fetcher.delete(`/${id}`);

export const changeTimestampOrder = (data) => {
  return fetcher.put(`/order`, data);
};
