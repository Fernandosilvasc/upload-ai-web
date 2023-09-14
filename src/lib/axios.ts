import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_UPLOAD_AI_BASE_URL
})