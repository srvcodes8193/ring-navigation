# API Key Usage Guide

## ✅ Your API Key is Now Configured

**API Key:** `apikey1234abcdefghij0123456789`

This key is stored in your `.env` file and is **NOT committed to git** (protected by `.gitignore`).

## 📖 How to Use the API Key

### Method 1: Direct Access (Simple)

```typescript
import Config from 'react-native-config';

// Use the API key directly
const apiKey = Config.API_KEY; // "apikey1234abcdefghij0123456789"

// Example: Fetch data with API key
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': `Bearer ${Config.API_KEY}`,
    // Or 'X-API-Key': Config.API_KEY,
    'Content-Type': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### Method 2: Using the API Service (Recommended)

I've created a complete API service at `src/services/api.ts` that automatically includes your API key in all requests.

```typescript
import {api} from '../services/api';

// Example 1: Fetch all users
const fetchUsers = async () => {
  try {
    const users = await api.getUsers();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Example 2: Fetch single user
const fetchUser = async (userId: string) => {
  try {
    const user = await api.getUser(userId);
    console.log('User:', user);
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

// Example 3: Create new user
const createUser = async () => {
  try {
    const newUser = await api.createUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('Created user:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

// Example 4: Update user
const updateUser = async (userId: string) => {
  try {
    const updatedUser = await api.updateUser(userId, {
      name: 'John Updated',
    });
    console.log('Updated user:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

// Example 5: Delete user
const deleteUser = async (userId: string) => {
  try {
    await api.deleteUser(userId);
    console.log('User deleted');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};
```

## 🎯 Real Component Example

```typescript
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {api} from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await api.deleteUser(userId);
      // Reload users after deletion
      await loadUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userItem}>
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  error: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserListScreen;
```

## 🔐 Different API Key Authentication Methods

Your API might expect the API key in different formats:

### 1. Bearer Token (Most Common)
```typescript
headers: {
  'Authorization': `Bearer ${Config.API_KEY}`,
}
```

### 2. X-API-Key Header
```typescript
headers: {
  'X-API-Key': Config.API_KEY,
}
```

### 3. Custom Header
```typescript
headers: {
  'api-key': Config.API_KEY,
}
```

### 4. Query Parameter
```typescript
const url = `https://api.example.com/data?api_key=${Config.API_KEY}`;
```

### 5. Basic Auth
```typescript
const credentials = btoa(`api:${Config.API_KEY}`);
headers: {
  'Authorization': `Basic ${credentials}`,
}
```

## 🎨 Using with React Hooks

### Custom Hook for API Calls

```typescript
// src/hooks/useApi.ts
import {useState, useEffect} from 'react';
import {api} from '../services/api';

export function useApi<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get<T>(endpoint);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [endpoint]);

  return {data, loading, error, refetch};
}
```

### Usage:
```typescript
const MyComponent = () => {
  const {data, loading, error, refetch} = useApi<User[]>('/users');

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      {data?.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <Button title="Refresh" onPress={refetch} />
    </View>
  );
};
```

## 🔄 Updating Your API Key

1. Edit `.env` file:
   ```bash
   API_KEY=your_new_api_key_here
   ```

2. Restart Metro bundler:
   ```bash
   npm start -- --reset-cache
   ```

3. Rebuild the app:
   ```bash
   npm run android
   # or
   npm run ios
   ```

## 🌍 Different API Keys for Different Environments

### `.env.development`
```bash
API_KEY=dev_key_1234567890
API_BASE_URL=https://dev-api.example.com
```

### `.env.staging`
```bash
API_KEY=staging_key_9876543210
API_BASE_URL=https://staging-api.example.com
```

### `.env.production`
```bash
API_KEY=prod_key_abcdefghij
API_BASE_URL=https://api.example.com
```

### Run with specific environment:
```bash
# Development
npm run android

# Staging
ENVFILE=.env.staging npm run android

# Production
ENVFILE=.env.production npm run android
```

## 🚨 Important Security Notes

1. ✅ **Your API key is in `.env`** - This file is NOT committed to git
2. ✅ **`.env` is in `.gitignore`** - Protected from accidental commits
3. ❌ **Never hardcode API keys** - Always use `Config.API_KEY`
4. ❌ **Never log API keys** - Remove from console.log in production
5. ✅ **Use different keys per environment** - dev, staging, production

## 📱 Check API Key in App

Your API key is already displayed in **HomeScreen** under the "Environment Variables" section. You'll see:

```
API Base URL: https://api.example.com
```

And the API key is being used internally by the API service.

## 🔗 Files Created

- **[src/services/api.ts](src/services/api.ts)** - Complete API service with your API key configured
- **[.env](.env)** - Your API key: `apikey1234abcdefghij0123456789`

---

**Ready to use!** 🎉 Your API key is configured and ready for all API calls.
