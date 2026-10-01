# Toast/Snackbar System - Complete

## ✅ Setup Complete

A lightweight, customizable toast/snackbar notification system built entirely with React Native components - **no external dependencies required**.

## 📦 What Was Created

### 1. Toast Component (`src/components/ui/Toast.tsx`)
- Animated slide-in/slide-out transitions
- 4 toast types with color-coded backgrounds
- Top and bottom positioning
- Auto-dismiss with configurable duration
- Optional action button (e.g., "Undo", "Retry")
- Manual close button
- Icon indicators for each type

### 2. Toast Provider (`src/components/ui/ToastProvider.tsx`)
- Global toast management with React Context
- `useToast` hook for easy access anywhere in the app
- Automatic toast queuing (one toast per position)
- Clean, declarative API

### 3. Updated Files
- `src/components/ui/index.ts` - Added Toast exports
- `App.tsx` - Wrapped with ToastProvider
- `ComponentDemoScreen.tsx` - Added comprehensive Toast showcase

## 🎨 Toast Component Features

### Toast Types
- **Success** (Green) - ✓ icon
- **Error** (Red) - ✕ icon
- **Warning** (Orange) - ⚠ icon
- **Info** (Blue) - ℹ icon

### Positions
- **Top** - Appears 50px from top
- **Bottom** - Appears 50px from bottom (default)

### Props
```typescript
interface ToastProps {
  message: string;           // Toast message text
  type?: ToastType;         // 'success' | 'error' | 'warning' | 'info'
  position?: ToastPosition; // 'top' | 'bottom'
  duration?: number;        // Auto-hide duration in ms (default: 3000)
  onHide?: () => void;      // Callback when toast hides
  actionText?: string;      // Optional action button text
  onActionPress?: () => void; // Action button callback
}
```

## 📖 Usage

### Basic Usage

```tsx
import {useToast} from '../components/ui';

const MyComponent = () => {
  const {showToast} = useToast();

  const handleSuccess = () => {
    showToast({
      message: 'Operation completed successfully!',
      type: 'success',
      duration: 3000,
    });
  };

  return <Button title="Show Toast" onPress={handleSuccess} />;
};
```

### Toast with Action Button

```tsx
const handleDelete = () => {
  showToast({
    message: 'Item deleted from cart',
    type: 'info',
    duration: 5000,
    actionText: 'Undo',
    onActionPress: () => {
      // Handle undo action
      console.log('Undo pressed');
    },
  });
};
```

### Different Positions

```tsx
// Top toast
showToast({
  message: 'Notification from server',
  type: 'info',
  position: 'top',
  duration: 3000,
});

// Bottom toast (default)
showToast({
  message: 'Changes saved',
  type: 'success',
  position: 'bottom',
  duration: 2000,
});
```

### All Toast Types

```tsx
// Success
showToast({
  message: 'Profile updated successfully!',
  type: 'success',
});

// Error
showToast({
  message: 'Failed to connect to server',
  type: 'error',
});

// Warning
showToast({
  message: 'This action cannot be undone',
  type: 'warning',
});

// Info
showToast({
  message: 'New version available',
  type: 'info',
});
```

### Custom Duration

```tsx
// Short toast (1 second)
showToast({
  message: 'Quick message',
  type: 'info',
  duration: 1000,
});

// Long toast (6 seconds)
showToast({
  message: 'This message stays longer',
  type: 'info',
  duration: 6000,
});
```

## 🎯 ComponentDemoScreen Showcase

The demo screen includes examples of:
- ✅ All 4 toast types (success, error, warning, info)
- ✅ Top and bottom positioning
- ✅ Toast with action buttons (Undo, Retry)
- ✅ Custom durations (1s, 3s, 6s)
- ✅ Interactive buttons to trigger each variant

## 🔧 API Reference

### `useToast()` Hook

Returns an object with:
```typescript
{
  showToast: (config) => void;  // Show a new toast
  hideToast: (id) => void;      // Manually hide a toast by ID
}
```

### `showToast()` Config

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| message | string | required | Toast message text |
| type | 'success' \| 'error' \| 'warning' \| 'info' | 'info' | Toast type with color/icon |
| position | 'top' \| 'bottom' | 'bottom' | Screen position |
| duration | number | 3000 | Auto-hide duration (ms) |
| actionText | string | undefined | Action button text |
| onActionPress | () => void | undefined | Action button callback |

## ✨ Features

### Animations
- Smooth slide-in from top/bottom with fade
- Smooth slide-out with fade when closing
- Native driver for 60fps performance

### User Interactions
- Tap action button to perform action and close
- Tap close button (✕) to dismiss immediately
- Auto-dismiss after duration
- Touch events don't block underlying content

### Visual Design
- Color-coded backgrounds for each type
- Icon indicators matching the type
- Rounded corners (8px radius)
- Shadow/elevation for depth
- Responsive width (max-width: screen width - 32px)
- 2-line message limit with ellipsis

### Smart Queuing
- Only one toast per position at a time
- New toast replaces existing toast at same position
- Different positions can show simultaneously

## 🚀 Real-World Examples

### Form Validation
```tsx
const handleSubmit = () => {
  if (!email.includes('@')) {
    showToast({
      message: 'Please enter a valid email address',
      type: 'error',
      duration: 3000,
    });
    return;
  }

  showToast({
    message: 'Form submitted successfully!',
    type: 'success',
    duration: 2000,
  });
};
```

### Network Operations
```tsx
const fetchData = async () => {
  try {
    const response = await api.getData();
    showToast({
      message: 'Data loaded successfully',
      type: 'success',
      duration: 2000,
    });
  } catch (error) {
    showToast({
      message: 'Failed to load data',
      type: 'error',
      duration: 3000,
      actionText: 'Retry',
      onActionPress: fetchData,
    });
  }
};
```

### User Feedback
```tsx
const handleLike = () => {
  showToast({
    message: 'Added to favorites',
    type: 'success',
    position: 'bottom',
    duration: 2000,
    actionText: 'Undo',
    onActionPress: () => {
      // Remove from favorites
    },
  });
};
```

## 📝 Technical Details

### Pure React Native
- Built with `Animated` API for smooth animations
- No third-party dependencies
- Uses React Context for global state
- Fully typed with TypeScript

### Performance
- Uses `useNativeDriver: true` for animations
- Efficient re-renders with Context optimization
- Automatic cleanup on unmount
- Minimal bundle size impact

### Accessibility
- Clear visual feedback with colors and icons
- Readable text with good contrast
- Manual close option for extended reading time
- Action buttons for user control

## 🎨 Customization

The toast colors are defined in the component and can be easily customized:

```typescript
// In Toast.tsx
const getBackgroundColor = (): string => {
  switch (type) {
    case 'success':
      return '#34C759'; // Customize this
    case 'error':
      return '#FF3B30'; // Customize this
    case 'warning':
      return '#FF9500'; // Customize this
    case 'info':
      return '#007AFF'; // Customize this
  }
};
```

## 📱 Component Demo

To see all toast variants in action, run the app and navigate to `ComponentDemoScreen.tsx`. The screen includes interactive buttons to test:
- All toast types
- Different positions
- Action buttons
- Custom durations

## 🔗 Integration

The toast system is already integrated into your app:
1. ✅ ToastProvider wraps the app in `App.tsx`
2. ✅ `useToast` hook available in all components
3. ✅ Fully showcased in `ComponentDemoScreen.tsx`
4. ✅ Exported from `src/components/ui/index.ts`

Ready to use anywhere in your app! 🎉
