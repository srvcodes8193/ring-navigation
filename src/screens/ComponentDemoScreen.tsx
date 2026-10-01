/**
 * Component Demo Screen
 * Demonstrates usage of all reusable UI components
 * This is a sample screen for reference only
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ScreenWrapper,
  Button,
  Input,
  Loader,
  ErrorMessage,
  Icon,
  useToast,
} from '../components/ui';

const ComponentDemoScreen: React.FC = () => {
  const {showToast} = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // Validate email
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');

    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Form submitted successfully!');
    }, 2000);
  };

  const handleShowOverlay = () => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  };

  return (
    <ScreenWrapper scrollable backgroundColor="#F5F5F5">
      <Text style={styles.title}>UI Components Demo</Text>
      <Text style={styles.subtitle}>
        This screen demonstrates all reusable components
      </Text>

      {/* Error Messages Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Error Messages</Text>

        {showError && (
          <ErrorMessage
            message="This is an error message. Something went wrong!"
            variant="error"
            onDismiss={() => setShowError(false)}
          />
        )}

        {showWarning && (
          <ErrorMessage
            message="This is a warning. Please check your input."
            variant="warning"
            onDismiss={() => setShowWarning(false)}
          />
        )}

        <ErrorMessage
          message="This is an info message. Just letting you know."
          variant="info"
        />
      </View>

      {/* Input Fields Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Input Fields</Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input
          placeholder="Disabled input"
          editable={false}
          value="This field is disabled"
        />
      </View>

      {/* Buttons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Buttons</Text>

        <Button
          title="Primary Button"
          onPress={handleSubmit}
          loading={isLoading}
          style={styles.buttonSpacing}
        />

        <Button
          title="Secondary Button"
          onPress={() => alert('Secondary pressed')}
          variant="secondary"
          style={styles.buttonSpacing}
        />

        <Button
          title="Outline Button"
          onPress={() => alert('Outline pressed')}
          variant="outline"
          style={styles.buttonSpacing}
        />

        <Button
          title="Ghost Button"
          onPress={() => alert('Ghost pressed')}
          variant="ghost"
          style={styles.buttonSpacing}
        />

        <View style={styles.row}>
          <Button
            title="Small"
            onPress={() => {}}
            size="small"
            style={styles.rowButton}
          />
          <Button
            title="Medium"
            onPress={() => {}}
            size="medium"
            style={styles.rowButton}
          />
          <Button
            title="Large"
            onPress={() => {}}
            size="large"
            style={styles.rowButton}
          />
        </View>

        <Button
          title="Disabled Button"
          onPress={() => {}}
          disabled
          style={styles.buttonSpacing}
        />
      </View>

      {/* Loader Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loaders</Text>

        <View style={styles.loaderRow}>
          <View style={styles.loaderItem}>
            <Loader size="small" />
            <Text style={styles.loaderLabel}>Small</Text>
          </View>

          <View style={styles.loaderItem}>
            <Loader size="large" />
            <Text style={styles.loaderLabel}>Large</Text>
          </View>

          <View style={styles.loaderItem}>
            <Loader size="large" color="#FF3B30" />
            <Text style={styles.loaderLabel}>Custom Color</Text>
          </View>
        </View>

        <Button
          title="Show Overlay Loader"
          onPress={handleShowOverlay}
          variant="secondary"
          style={styles.buttonSpacing}
        />
      </View>

      {/* Toast Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toast / Snackbar</Text>

        {/* Toast Types */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Toast Types</Text>

          <Button
            title="Success Toast"
            onPress={() =>
              showToast({
                message: 'Operation completed successfully!',
                type: 'success',
                duration: 3000,
              })
            }
            variant="primary"
            style={styles.buttonSpacing}
          />

          <Button
            title="Error Toast"
            onPress={() =>
              showToast({
                message: 'Something went wrong. Please try again.',
                type: 'error',
                duration: 3000,
              })
            }
            variant="primary"
            style={styles.buttonSpacing}
          />

          <Button
            title="Warning Toast"
            onPress={() =>
              showToast({
                message: 'This action cannot be undone.',
                type: 'warning',
                duration: 3000,
              })
            }
            variant="primary"
            style={styles.buttonSpacing}
          />

          <Button
            title="Info Toast"
            onPress={() =>
              showToast({
                message: 'Your data has been saved to the cloud.',
                type: 'info',
                duration: 3000,
              })
            }
            variant="primary"
            style={styles.buttonSpacing}
          />
        </View>

        {/* Toast Positions */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Toast Positions</Text>

          <View style={styles.row}>
            <Button
              title="Top Toast"
              onPress={() =>
                showToast({
                  message: 'Toast displayed at the top',
                  type: 'info',
                  position: 'top',
                  duration: 2000,
                })
              }
              size="medium"
              style={styles.rowButton}
            />

            <Button
              title="Bottom Toast"
              onPress={() =>
                showToast({
                  message: 'Toast displayed at the bottom',
                  type: 'info',
                  position: 'bottom',
                  duration: 2000,
                })
              }
              size="medium"
              style={styles.rowButton}
            />
          </View>
        </View>

        {/* Toast with Action */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Toast with Action</Text>

          <Button
            title="Toast with Undo Action"
            onPress={() =>
              showToast({
                message: 'Item deleted from cart',
                type: 'info',
                duration: 5000,
                actionText: 'Undo',
                onActionPress: () => {
                  showToast({
                    message: 'Action undone!',
                    type: 'success',
                    duration: 2000,
                  });
                },
              })
            }
            variant="secondary"
            style={styles.buttonSpacing}
          />

          <Button
            title="Toast with Retry Action"
            onPress={() =>
              showToast({
                message: 'Connection failed',
                type: 'error',
                duration: 5000,
                actionText: 'Retry',
                onActionPress: () => {
                  showToast({
                    message: 'Retrying connection...',
                    type: 'info',
                    duration: 2000,
                  });
                },
              })
            }
            variant="secondary"
            style={styles.buttonSpacing}
          />
        </View>

        {/* Long Duration */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Custom Duration</Text>

          <View style={styles.row}>
            <Button
              title="Short (1s)"
              onPress={() =>
                showToast({
                  message: 'Quick message',
                  type: 'info',
                  duration: 1000,
                })
              }
              size="small"
              style={styles.rowButton}
            />

            <Button
              title="Normal (3s)"
              onPress={() =>
                showToast({
                  message: 'Normal duration message',
                  type: 'info',
                  duration: 3000,
                })
              }
              size="small"
              style={styles.rowButton}
            />

            <Button
              title="Long (6s)"
              onPress={() =>
                showToast({
                  message: 'This message stays longer on screen',
                  type: 'info',
                  duration: 6000,
                })
              }
              size="small"
              style={styles.rowButton}
            />
          </View>
        </View>
      </View>

      {/* Icons Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Icons</Text>

        {/* Icon Sizes */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Different Sizes</Text>
          <View style={styles.iconRow}>
            <View style={styles.iconItem}>
              <Icon name="home" size={20} color="#007AFF" />
              <Text style={styles.iconLabel}>20px</Text>
            </View>
            <View style={styles.iconItem}>
              <Icon name="home" size={32} color="#007AFF" />
              <Text style={styles.iconLabel}>32px</Text>
            </View>
            <View style={styles.iconItem}>
              <Icon name="home" size={48} color="#007AFF" />
              <Text style={styles.iconLabel}>48px</Text>
            </View>
            <View style={styles.iconItem}>
              <Icon name="home" size={64} color="#007AFF" />
              <Text style={styles.iconLabel}>64px</Text>
            </View>
          </View>
        </View>

        {/* Icon Colors */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Different Colors</Text>
          <View style={styles.iconRow}>
            <Icon name="favorite" size={40} color="#FF3B30" />
            <Icon name="star" size={40} color="#FF9500" />
            <Icon name="lightbulb" size={40} color="#FFCC00" />
            <Icon name="eco" size={40} color="#34C759" />
            <Icon name="water-drop" size={40} color="#007AFF" />
            <Icon name="palette" size={40} color="#5856D6" />
          </View>
        </View>

        {/* Icon Families */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Icon Families</Text>

          <View style={styles.iconFamilyRow}>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="material" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>Material</Text>
            </View>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="material-community" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>Material Community</Text>
            </View>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="ionicons" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>Ionicons</Text>
            </View>
          </View>

          <View style={styles.iconFamilyRow}>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="feather" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>Feather</Text>
            </View>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="font-awesome" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>FontAwesome</Text>
            </View>
            <View style={styles.iconFamilyItem}>
              <Icon name="home" family="font-awesome5" size={32} color="#1A1A1A" />
              <Text style={styles.iconFamilyLabel}>FontAwesome5</Text>
            </View>
          </View>
        </View>

        {/* Icons in Buttons */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Icons in Buttons</Text>

          <View style={styles.iconButtonContainer}>
            <View style={styles.iconButton}>
              <Icon name="favorite" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.iconButton}>
              <Icon name="shopping-cart" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.iconButton}>
              <Icon name="notifications" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.iconButton}>
              <Icon name="settings" size={24} color="#FFFFFF" />
            </View>
          </View>
        </View>

        {/* Icons Inline with Text */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Icons Inline with Text</Text>

          <View style={styles.textWithIconContainer}>
            <View style={styles.textWithIcon}>
              <Icon name="email" size={20} color="#666666" />
              <Text style={styles.textWithIconLabel}>Email Address</Text>
            </View>

            <View style={styles.textWithIcon}>
              <Icon name="phone" size={20} color="#666666" />
              <Text style={styles.textWithIconLabel}>Phone Number</Text>
            </View>

            <View style={styles.textWithIcon}>
              <Icon name="location-on" size={20} color="#666666" />
              <Text style={styles.textWithIconLabel}>Location</Text>
            </View>

            <View style={styles.textWithIcon}>
              <Icon name="calendar-today" size={20} color="#666666" />
              <Text style={styles.textWithIconLabel}>Schedule</Text>
            </View>
          </View>
        </View>

        {/* Common Icons Grid */}
        <View style={styles.subsection}>
          <Text style={styles.subsectionTitle}>Common Icons</Text>

          <View style={styles.iconGrid}>
            <Icon name="home" size={28} color="#1A1A1A" />
            <Icon name="search" size={28} color="#1A1A1A" />
            <Icon name="favorite" size={28} color="#1A1A1A" />
            <Icon name="person" size={28} color="#1A1A1A" />
            <Icon name="settings" size={28} color="#1A1A1A" />
            <Icon name="notifications" size={28} color="#1A1A1A" />
            <Icon name="shopping-cart" size={28} color="#1A1A1A" />
            <Icon name="camera" size={28} color="#1A1A1A" />
            <Icon name="photo" size={28} color="#1A1A1A" />
            <Icon name="videocam" size={28} color="#1A1A1A" />
            <Icon name="music-note" size={28} color="#1A1A1A" />
            <Icon name="mail" size={28} color="#1A1A1A" />
            <Icon name="chat" size={28} color="#1A1A1A" />
            <Icon name="phone" size={28} color="#1A1A1A" />
            <Icon name="share" size={28} color="#1A1A1A" />
            <Icon name="download" size={28} color="#1A1A1A" />
            <Icon name="upload" size={28} color="#1A1A1A" />
            <Icon name="cloud" size={28} color="#1A1A1A" />
            <Icon name="folder" size={28} color="#1A1A1A" />
            <Icon name="bookmark" size={28} color="#1A1A1A" />
          </View>
        </View>
      </View>

      {/* Overlay Loader */}
      {showLoader && <Loader overlay text="Loading..." />}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  buttonSpacing: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  loaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  loaderItem: {
    alignItems: 'center',
  },
  loaderLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  // Icon styles
  subsection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 8,
  },
  iconFamilyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconFamilyItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  iconFamilyLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  iconButton: {
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textWithIconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  textWithIconLabel: {
    fontSize: 14,
    color: '#1A1A1A',
    marginLeft: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
});

export default ComponentDemoScreen;
