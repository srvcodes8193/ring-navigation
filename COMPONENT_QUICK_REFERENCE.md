# UI Components - Quick Reference

## Import
```tsx
import {Button, Input, Loader, ErrorMessage, ScreenWrapper} from './src/components/ui';
```

## Button
```tsx
// Basic
<Button title="Click Me" onPress={() => {}} />

// Variants
<Button title="Primary" onPress={() => {}} variant="primary" />
<Button title="Secondary" onPress={() => {}} variant="secondary" />
<Button title="Outline" onPress={() => {}} variant="outline" />
<Button title="Ghost" onPress={() => {}} variant="ghost" />

// Sizes
<Button title="Small" onPress={() => {}} size="small" />
<Button title="Medium" onPress={() => {}} size="medium" />
<Button title="Large" onPress={() => {}} size="large" />

// States
<Button title="Loading" onPress={() => {}} loading />
<Button title="Disabled" onPress={() => {}} disabled />
```

## Input
```tsx
// Basic
<Input
  placeholder="Enter text"
  value={value}
  onChangeText={setValue}
/>

// With label
<Input
  label="Email"
  placeholder="email@example.com"
  value={email}
  onChangeText={setEmail}
/>

// With error
<Input
  label="Password"
  value={password}
  onChangeText={setPassword}
  error="Password is required"
  secureTextEntry
/>
```

## Loader
```tsx
// Inline
<Loader />
<Loader size="small" />
<Loader color="#FF0000" />

// Overlay
{loading && <Loader overlay text="Please wait..." />}
```

## ErrorMessage
```tsx
// Error
<ErrorMessage message="Something went wrong!" variant="error" />

// Warning
<ErrorMessage message="Please check input" variant="warning" />

// Info
<ErrorMessage message="Just a heads up" variant="info" />

// Dismissible
<ErrorMessage
  message="Dismiss me"
  onDismiss={() => setError(null)}
/>
```

## ScreenWrapper
```tsx
// Basic (non-scrollable)
<ScreenWrapper>
  <Text>Content</Text>
</ScreenWrapper>

// Scrollable
<ScreenWrapper scrollable>
  <Text>Long content...</Text>
</ScreenWrapper>

// Custom background
<ScreenWrapper scrollable backgroundColor="#F5F5F5">
  <Text>Content</Text>
</ScreenWrapper>

// No padding
<ScreenWrapper padding={false}>
  <Text>Full width content</Text>
</ScreenWrapper>
```

## Complete Form Example
```tsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);

return (
  <ScreenWrapper scrollable>
    {error && (
      <ErrorMessage
        message={error}
        onDismiss={() => setError('')}
      />
    )}

    <Input
      label="Email"
      placeholder="email@example.com"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <Input
      label="Password"
      placeholder="Enter password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />

    <Button
      title="Sign In"
      onPress={handleSignIn}
      loading={loading}
    />

    <Button
      title="Cancel"
      onPress={handleCancel}
      variant="outline"
    />

    {loading && <Loader overlay text="Signing in..." />}
  </ScreenWrapper>
);
```
