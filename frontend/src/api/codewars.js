import { api } from "../services/api";

export const searchKata = (query) =>
  api.get(`/codewars/search/?q=${encodeURIComponent(query)}`);
export const getCachedKatas = () => api.get("/codewars/katas/");
export const getCachedKata = (kataId) => api.get(`/codewars/katas/${kataId}/`);
