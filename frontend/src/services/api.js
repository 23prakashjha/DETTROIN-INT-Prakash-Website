const API_BASE_URL = 'https://dettroin-int-prakash-website.onrender.com/api';

// Simple API helper with token management
export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (err) {
    console.error(`API Error in ${endpoint}:`, err);
    throw err;
  }
};

export const authAPI = {
  login: (email, password) => 
    request('/auth/login', { method: 'POST', body: { email, password } }),
  
  register: (name, email, password, role) => 
    request('/auth/register', { method: 'POST', body: { name, email, password, role } }),
  
  getMe: () => 
    request('/auth/me', { method: 'GET' }),
};

export const admissionsAPI = {
  submit: (formData) => 
    request('/admissions', { method: 'POST', body: formData }),
  
  getAll: () => 
    request('/admissions', { method: 'GET' }),
  
  updateStatus: (id, status) => 
    request(`/admissions/${id}`, { method: 'PUT', body: { status } }),
};

export const noticesAPI = {
  getAll: () => 
    request('/notices', { method: 'GET' }),
  
  create: (noticeData) => 
    request('/notices', { method: 'POST', body: noticeData }),
  
  delete: (id) => 
    request(`/notices/${id}`, { method: 'DELETE' }),
};

export const gradesAPI = {
  getAll: (studentEmail = '') => {
    const query = studentEmail ? `?studentEmail=${encodeURIComponent(studentEmail)}` : '';
    return request(`/grades${query}`, { method: 'GET' });
  },
  
  create: (gradeData) => 
    request('/grades', { method: 'POST', body: gradeData }),
  
  delete: (id) => 
    request(`/grades/${id}`, { method: 'DELETE' }),
};
