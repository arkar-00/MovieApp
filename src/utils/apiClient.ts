import axios from 'axios'
import { API_CONFIG } from '../config/api'
import { BaseError } from '../types/api.response'

const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include API key and log request url/body
apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: API_CONFIG.apiKey,
  }
  // Log the request URL and body
  const url = `${config.baseURL}${config.url}`
  console.log('Request URL:', url)
  if (config.data) {
    console.log('Request Body:', config.data)
  }
  return config
})

// Add response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: BaseError = {
      message:
        error.response?.data?.status_message ||
        error.message ||
        'Network error',
      status_code: error.response?.status,
    }
    return Promise.reject(apiError)
  },
)

export default apiClient
