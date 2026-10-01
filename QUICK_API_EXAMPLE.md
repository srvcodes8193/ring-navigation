# Quick API Key Usage - Copy & Paste Examples

Your API Key: `apikey1234abcdefghij0123456789` is configured in `.env`

## 🚀 Quick Start - 3 Ways to Use Your API Key

### 1️⃣ Direct Fetch (Simplest)

```typescript
import Config from 'react-native-config';

// GET Request
fetch('https://api.example.com/users', {
  headers: {
    'Authorization': `Bearer ${Config.API_KEY}`,
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log('Users:', data))
  .catch(error => console.error('Error:', error));

// POST Request
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${Config.API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
  }),
})
  .then(response => response.json())
  .then(data => console.log('Created:', data))
  .catch(error => console.error('Error:', error));
```

### 2️⃣ Using the API Service (Recommended)

```typescript
import {api} from '../services/api';

// In your component or function
const fetchData = async () => {
  try {
    // GET request
    const users = await api.getUsers();
    console.log('Users:', users);

    // POST request
    const newUser = await api.createUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('Created:', newUser);

    // PUT request
    const updated = await api.updateUser('123', {name: 'Jane Doe'});
    console.log('Updated:', updated);

    // DELETE request
    await api.deleteUser('123');
    console.log('Deleted');

  } catch (error) {
    console.error('API Error:', error);
  }
};
```

### 3️⃣ In a React Component

```typescript
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {api} from '../services/api';

const MyComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      {users.map((user: any) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <Button title="Refresh" onPress={loadUsers} />
    </View>
  );
};
```

## 📋 Common API Patterns

### Pattern 1: List Items
```typescript
const users = await api.get<User[]>('/users');
```

### Pattern 2: Get Single Item
```typescript
const user = await api.get<User>('/users/123');
```

### Pattern 3: Create Item
```typescript
const newUser = await api.post<User>('/users', {
  name: 'John',
  email: 'john@example.com',
});
```

### Pattern 4: Update Item
```typescript
const updated = await api.put<User>('/users/123', {
  name: 'Updated Name',
});
```

### Pattern 5: Delete Item
```typescript
await api.delete('/users/123');
```

### Pattern 6: Search/Filter
```typescript
const results = await api.get<User[]>('/users?search=john');
```

### Pattern 7: Pagination
```typescript
const page1 = await api.get<User[]>('/users?page=1&limit=10');
```

## 🔧 Your API Service Methods

The API service at `src/services/api.ts` automatically includes your API key:

```typescript
api.get(endpoint)       // GET request
api.post(endpoint, data)    // POST request
api.put(endpoint, data)     // PUT request
api.delete(endpoint)        // DELETE request

// Pre-built methods:
api.getUsers()              // GET /users
api.getUser(id)             // GET /users/:id
api.createUser(data)        // POST /users
api.updateUser(id, data)    // PUT /users/:id
api.deleteUser(id)          // DELETE /users/:id
```

## 🎯 Test Your API Key

Run the app and check **HomeScreen** - you'll see:
```
API Key: apikey1234...
```

This confirms your API key is loaded correctly!

## 🔄 Change API Key

1. Edit `.env`:
   ```bash
   API_KEY=your_new_key_here
   ```

2. Restart and rebuild:
   ```bash
   npm start -- --reset-cache
   npm run android  # or npm run ios
   ```

## 📚 Full Documentation

- **[API_KEY_USAGE.md](API_KEY_USAGE.md)** - Complete guide with all examples
- **[ENV_SETUP.md](ENV_SETUP.md)** - Environment variables documentation
- **[src/services/api.ts](src/services/api.ts)** - API service source code

---

**Your API key is ready!** Just use `api.get()`, `api.post()`, etc. and the key is automatically included. 🎉
