# Axios HTTP Client - Setup Complete

## ✅ Package Installed

**axios** - Promise-based HTTP client for making API requests

## 📦 What Was Done

### 1. Package Installation
```bash
npm install axios
```

### 2. API Service Refactored
- Location: `src/services/api.ts`
- **Before**: Used native fetch API with manual timeout handling
- **After**: Uses axios with powerful interceptors and built-in features

### 3. Key Features Implemented

#### Request Interceptor
- Automatically adds API key to all requests
- Logs requests in development mode
- Centralized request configuration

#### Response Interceptor
- Global error handling
- Logs responses in development mode
- Handles different error types (network, server, timeout)

#### HTTP Methods
- `GET` - Fetch data
- `POST` - Create data
- `PUT` - Update data (full replacement)
- `PATCH` - Update data (partial update)
- `DELETE` - Remove data

### 4. HomeScreen Updated
Added interactive axios demo:
- Button to trigger API request
- Loading indicator during request
- Response display in scrollable container
- Error handling display
- Uses JSONPlaceholder test API

## 🚀 Why Axios Over Fetch?

### Axios Advantages:
1. **Interceptors** - Modify requests/responses globally
2. **Automatic JSON** - No need for `response.json()`
3. **Better Errors** - Distinguishes between network and server errors
4. **Timeout** - Built-in timeout configuration
5. **Request Cancellation** - Easy to cancel pending requests
6. **Progress Tracking** - Monitor upload/download progress
7. **Browser Support** - Better cross-browser compatibility

### Comparison:

#### With Fetch (Old):
```typescript
async get<T>(endpoint: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), this.timeout);

  const response = await fetch(`${this.baseURL}${endpoint}`, {
    method: 'GET',
    headers: this.getHeaders(),
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
}
```

#### With Axios (New):
```typescript
async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await this.client.get<T>(endpoint, config);
  return response.data;
}
```

Much cleaner! Interceptors handle headers, timeout is built-in, and JSON parsing is automatic.

## 🔧 API Service Architecture

### Singleton Pattern
```typescript
class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: Config.API_BASE_URL || 'https://api.example.com',
      timeout: parseInt(Config.API_TIMEOUT || '30000', 10),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }
}

export const api = new ApiService();
```

### Request Interceptor
```typescript
this.client.interceptors.request.use(
  (config) => {
    // Add API key to every request
    const apiKey = Config.API_KEY || '';
    if (apiKey && config.headers) {
      config.headers.Authorization = `Bearer ${apiKey}`;
    }

    // Log in development
    if (Config.APP_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);
```

### Response Interceptor
```typescript
this.client.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (Config.APP_ENV === 'development') {
      console.log(`[API Response] ${response.status}`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Categorize and log errors
    if (error.response) {
      // Server error (4xx, 5xx)
      console.error('[API Error]', error.response.status, error.response.data);
    } else if (error.request) {
      // Network error
      console.error('[API Error] No response received', error.message);
    } else {
      // Other error
      console.error('[API Error]', error.message);
    }

    return Promise.reject(error);
  }
);
```

## 📝 Usage Examples

### Basic Usage

#### GET Request
```typescript
import {api} from '../services/api';

// Simple GET
const users = await api.get<User[]>('/users');

// GET with query params
const filtered = await api.get<User[]>('/users', {
  params: {
    role: 'admin',
    status: 'active',
  }
});
```

#### POST Request
```typescript
// Create new user
const newUser = await api.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
});
```

#### PUT Request
```typescript
// Full update
const updated = await api.put<User>('/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'admin',
});
```

#### PATCH Request
```typescript
// Partial update
const patched = await api.patch<User>('/users/123', {
  role: 'admin', // Only update role
});
```

#### DELETE Request
```typescript
// Delete user
await api.delete('/users/123');
```

### Advanced Usage

#### Custom Headers
```typescript
const data = await api.get<Data>('/protected', {
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

#### Request Timeout Override
```typescript
const data = await api.post<Data>('/slow-endpoint', body, {
  timeout: 60000, // 60 seconds
});
```

#### Request Cancellation
```typescript
import axios from 'axios';

const source = axios.CancelToken.source();

const fetchData = async () => {
  try {
    const data = await api.get<Data>('/data', {
      cancelToken: source.token,
    });
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    }
  }
};

// Cancel the request
source.cancel('Operation canceled by user');
```

#### Upload Progress
```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.getClient().post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const percentage = (progressEvent.loaded * 100) / progressEvent.total!;
      console.log(`Upload Progress: ${percentage}%`);
    },
  });

  return response.data;
};
```

#### Download Progress
```typescript
const downloadFile = async (fileId: string) => {
  const response = await api.getClient().get(`/files/${fileId}`, {
    responseType: 'blob',
    onDownloadProgress: (progressEvent) => {
      const percentage = (progressEvent.loaded * 100) / progressEvent.total!;
      console.log(`Download Progress: ${percentage}%`);
    },
  });

  return response.data;
};
```

## 🎯 React Component Examples

### Simple Data Fetching
```typescript
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {api} from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.get<User[]>('/users');
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View>
          <Text>{item.name}</Text>
          <Text>{item.email}</Text>
        </View>
      )}
    />
  );
};
```

### Form Submission
```typescript
import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {api} from '../services/api';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setSubmitting(true);
    try {
      const newUser = await api.post('/users', {
        name,
        email,
      });

      Alert.alert('Success', `User created: ${newUser.name}`);
      setName('');
      setEmail('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button
        title={submitting ? 'Creating...' : 'Create User'}
        onPress={handleSubmit}
        disabled={submitting}
      />
    </View>
  );
};
```

### Paginated List
```typescript
const PaginatedList = () => {
  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get<Item[]>('/items', {
        params: {
          page,
          limit: 20,
        },
      });

      if (response.length === 0) {
        setHasMore(false);
      } else {
        setData([...data, ...response]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlatList
      data={data}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};
```

## 🔐 Security Best Practices

### 1. Never Hardcode API Keys
```typescript
// ❌ BAD
const API_KEY = 'sk_live_12345678';

// ✅ GOOD
const apiKey = Config.API_KEY;
```

### 2. Use HTTPS Only
```typescript
// .env
API_BASE_URL=https://api.example.com  # Always HTTPS
```

### 3. Validate Response Data
```typescript
const users = await api.get<User[]>('/users');
if (!Array.isArray(users)) {
  throw new Error('Invalid response format');
}
```

### 4. Handle Sensitive Data
```typescript
// Don't log sensitive data in production
if (Config.APP_ENV === 'development') {
  console.log('Response:', data);
}
```

## 🎯 Demo Location

Open the app and check **HomeScreen** to see:
- Axios demo button
- Live API request to JSONPlaceholder
- Response display with JSON formatting
- Loading state and error handling

## 📚 Additional Resources

### Axios Documentation
- [Official Documentation](https://axios-http.com/docs/intro)
- [Request Config](https://axios-http.com/docs/req_config)
- [Response Schema](https://axios-http.com/docs/res_schema)
- [Interceptors](https://axios-http.com/docs/interceptors)
- [Handling Errors](https://axios-http.com/docs/handling_errors)

### TypeScript with Axios
- [Type Safety](https://axios-http.com/docs/typescript)
- [Generic Types](https://blog.logrocket.com/how-to-use-axios-with-typescript/)

## 🚀 Next Steps

1. Run the app to see axios in action
2. Click "Make API Request" in HomeScreen
3. Check console logs for request/response interceptors (in development)
4. Modify the API service to add custom interceptors
5. Create your own API endpoints using the existing methods
6. Add authentication tokens to requests via interceptors

---

**Ready to use!** 🎉 Axios is fully integrated with interceptors, error handling, and a live demo in HomeScreen.
