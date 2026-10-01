# Axios HTTP Client - Quick Reference

## 🚀 Quick Examples

### Basic Requests

```typescript
import {api} from '../services/api';

// GET - Fetch data
const users = await api.get<User[]>('/users');

// POST - Create data
const newUser = await api.post<User>('/users', {
  name: 'John',
  email: 'john@example.com'
});

// PUT - Full update
const updated = await api.put<User>('/users/123', {
  name: 'Jane',
  email: 'jane@example.com'
});

// PATCH - Partial update
const patched = await api.patch<User>('/users/123', {
  name: 'Jane'
});

// DELETE - Remove data
await api.delete('/users/123');
```

## 🎯 Common Patterns

### Pattern 1: Fetch List
```typescript
const fetchUsers = async () => {
  try {
    const users = await api.get<User[]>('/users');
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};
```

### Pattern 2: Create Item
```typescript
const createUser = async (data: CreateUserDto) => {
  try {
    const newUser = await api.post<User>('/users', data);
    return newUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};
```

### Pattern 3: Query Parameters
```typescript
// Search with filters
const results = await api.get<User[]>('/users', {
  params: {
    search: 'john',
    role: 'admin',
    status: 'active'
  }
});
```

### Pattern 4: Pagination
```typescript
const getPage = async (page: number, limit: number = 20) => {
  return await api.get<User[]>('/users', {
    params: { page, limit }
  });
};
```

### Pattern 5: Custom Headers
```typescript
const fetchProtected = async () => {
  return await api.get<Data>('/protected', {
    headers: {
      'X-Custom-Header': 'value'
    }
  });
};
```

### Pattern 6: File Upload
```typescript
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.getClient().post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (e) => {
      const percent = (e.loaded * 100) / e.total!;
      console.log(`${percent}%`);
    }
  });

  return response.data;
};
```

## 🎨 React Component Examples

### Example 1: Simple List
```typescript
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<User[]>('/users')
      .then(setUsers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
};
```

### Example 2: Form Submission
```typescript
const CreateForm = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post('/users', { name });
      Alert.alert('Success!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput value={name} onChangeText={setName} />
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
    </View>
  );
};
```

### Example 3: Search
```typescript
const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const search = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }

    try {
      const data = await api.get<User[]>('/users', {
        params: { search: searchQuery }
      });
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View>
      <TextInput
        placeholder="Search users..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList data={results} />
    </View>
  );
};
```

## 🔧 Advanced Features

### Request Cancellation
```typescript
import axios from 'axios';

const source = axios.CancelToken.source();

// Make request
api.get('/data', { cancelToken: source.token });

// Cancel request
source.cancel('Canceled by user');
```

### Retry Failed Requests
```typescript
const fetchWithRetry = async (url: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await api.get(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### Concurrent Requests
```typescript
const [users, posts, comments] = await Promise.all([
  api.get<User[]>('/users'),
  api.get<Post[]>('/posts'),
  api.get<Comment[]>('/comments')
]);
```

## ✨ What's Included

### Automatic Features
- ✅ API key added to all requests (via interceptor)
- ✅ JSON parsing
- ✅ Timeout handling (30s default)
- ✅ Error categorization (network, server, other)
- ✅ Development logging
- ✅ TypeScript type safety

### Available Methods
```typescript
api.get<T>(endpoint, config?)      // GET request
api.post<T>(endpoint, data, config?)   // POST request
api.put<T>(endpoint, data, config?)    // PUT request
api.patch<T>(endpoint, data, config?)  // PATCH request
api.delete<T>(endpoint, config?)       // DELETE request
api.getClient()                         // Access axios instance
```

## 🎯 See It In Action

Run the app and open **HomeScreen**:
1. Find the "Axios HTTP Client" section
2. Click "Make API Request"
3. Watch the loading state
4. See the JSON response displayed

## 📁 Key Files

- **API Service:** [src/services/api.ts](src/services/api.ts)
- **Documentation:** [AXIOS_SETUP.md](AXIOS_SETUP.md)
- **Demo:** [src/screens/HomeScreen.tsx](src/screens/HomeScreen.tsx)
- **Environment:** [.env](.env)

## 💡 Tips

1. **Type Safety** - Always use generics: `api.get<User[]>(...)`
2. **Error Handling** - Always wrap in try-catch
3. **Loading States** - Show loading indicators
4. **Environment** - Use Config for URLs and keys
5. **Interceptors** - Add custom logic globally in api.ts

---

Full documentation in [AXIOS_SETUP.md](AXIOS_SETUP.md)
