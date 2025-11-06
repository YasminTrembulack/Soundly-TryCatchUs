import api from "./api";

export async function getData(endpoint, params = {}) {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Erro no GET ${endpoint}:`, error);
    throw error;
  }
}
