# UI Components Library

Generic, reusable UI components for the React Native project.

## Folder Structure

```
src/
└── components/
    └── ui/
        ├── Button.tsx
        ├── Input.tsx
        ├── Loader.tsx
        ├── ErrorMessage.tsx
        ├── ScreenWrapper.tsx
        └── index.ts
```

## Components

### 1. Button

Reusable button with variants, sizes, and loading states.

**Props:**
- `title`: string (required) - Button text
- `onPress`: () => void (required) - Press handler
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)
- `loading`: boolean (default: false)
- `style`: ViewStyle - Custom container styles
- `textStyle`: TextStyle - Custom text styles

**Usage:**
```tsx
import {Button} from '../components/ui';

<Button title="Submit" onPress={handleSubmit} />
<Button title="Cancel" onPress={handleCancel} variant="outline" />
<Button title="Loading" onPress={() => {}} loading />
```

---

### 2. Input

Text input with label, error state, and validation.

**Props:**
- All standard TextInput props
- `label`: string - Label above input
- `error`: string - Error message below input
- `containerStyle`: ViewStyle - Container styles
- `inputStyle`: TextStyle - Input field styles
- `labelStyle`: TextStyle - Label text styles
- `errorStyle`: TextStyle - Error text styles

**Usage:**
```tsx
import {Input} from '../components/ui';

<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={emailError}
/>
```

---

### 3. Loader

Loading indicator with overlay option.

**Props:**
- `size`: 'small' | 'large' (default: 'large')
- `color`: string (default: '#007AFF')
- `overlay`: boolean (default: false) - Full screen modal overlay
- `text`: string - Text below spinner
- `style`: ViewStyle - Custom container styles

**Usage:**
```tsx
import {Loader} from '../components/ui';

// Inline loader
<Loader size="small" />

// Overlay loader
{isLoading && <Loader overlay text="Loading..." />}
```

---

### 4. ErrorMessage

Error/warning/info message display with dismissible option.

**Props:**
- `message`: string (required) - Message text
- `variant`: 'error' | 'warning' | 'info' (default: 'error')
- `onDismiss`: () => void - Dismiss callback
- `dismissText`: string (default: 'Dismiss')
- `style`: ViewStyle - Custom container styles
- `textStyle`: TextStyle - Custom text styles

**Usage:**
```tsx
import {ErrorMessage} from '../components/ui';

<ErrorMessage
  message="Invalid email format"
  variant="error"
  onDismiss={() => setError(null)}
/>

<ErrorMessage
  message="Please check your input"
  variant="warning"
/>
```

---

### 5. ScreenWrapper

Screen container with SafeArea, ScrollView, and padding.

**Props:**
- `children`: ReactNode (required)
- `scrollable`: boolean (default: false)
- `edges`: Edge[] (default: ['top', 'bottom', 'left', 'right'])
- `backgroundColor`: string (default: '#FFFFFF')
- `padding`: boolean (default: true)
- `style`: ViewStyle - Custom container styles

**Usage:**
```tsx
import {ScreenWrapper} from '../components/ui';

<ScreenWrapper>
  <Text>Non-scrollable content</Text>
</ScreenWrapper>

<ScreenWrapper scrollable backgroundColor="#F5F5F5">
  <Text>Scrollable content</Text>
</ScreenWrapper>
```

---

## Complete Example

See `src/screens/ComponentDemoScreen.tsx` for a full demonstration of all components.

## Import Pattern

```tsx
// Import all at once
import {Button, Input, Loader, ErrorMessage, ScreenWrapper} from '../components/ui';

// Or individually
import {Button} from '../components/ui/Button';
```

## Styling Guidelines

- All components accept `style` prop for customization
- Default colors are generic (not theme-dependent)
- Override styles via props for app-specific needs
- No hardcoded business logic or app-specific text

## Best Practices

1. **Keep components generic** - No app-specific logic
2. **Use composition** - Combine components for complex UI
3. **Override via props** - Don't modify component files directly
4. **Consistent naming** - Follow React Native conventions
5. **Accessibility** - Add accessibility labels where needed
