import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';

// For Android emulator, use 10.0.2.2
// For Genymotion, use 10.0.3.2
// For physical device, use your computer's IP address
const getReactotronConfig = () => {
  let host = 'localhost';

  // Try to get host from scriptURL (for Android emulator)
  if (__DEV__) {
    try {
      const scriptURL = NativeModules?.SourceCode?.scriptURL;
      if (scriptURL) {
        const scriptHostname = scriptURL.split('://')[1]?.split('/')[0]?.split(':')[0];
        if (scriptHostname) {
          host = scriptHostname;
        }
      }
    } catch (e) {
      // If we can't get scriptURL, just use localhost
      console.log('Using localhost for Reactotron');
    }
  }

  return {host};
};

const reactotron = Reactotron.configure(getReactotronConfig())
  .useReactNative({
    asyncStorage: false, // Set to true if you use AsyncStorage
    networking: {
      // Show network requests
      ignoreUrls: /symbolicate/,
    },
    editor: false, // Enable to open files in your editor from Reactotron
    overlay: false, // Enable overlay for performance monitoring
  })
  .connect();

// Clear Reactotron on each app load during development
if (__DEV__) {
  reactotron.clear!();
}

// Extend console to send logs to Reactotron
console.tron = reactotron;

export default reactotron;
