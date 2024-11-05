import baseURL from './apiService.js'

// sending room research for trip
export const sendData = async (data) => {
  try {
    const response = await apiClient.post('/chambre/searchRoom', data)
    return response.data
  } catch (error) {
    console.error('Error in sendData:', error)
    throw error // Re-throw to handle it in the component if needed
  }
}
// Helper function to make GET requests
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('GET request error:', error)
    throw error
  }
}

// Helper function to make POST requests
export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return await handleResponse(response)
  } catch (error) {
    console.error('POST request error:', error)
    throw error
  }
}

// Response handler to manage JSON parsing and errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }
  return await response.json()
}
