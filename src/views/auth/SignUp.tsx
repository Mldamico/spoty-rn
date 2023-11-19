import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import AuthInputField from '@components/auth/AuthInputField';

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="Your Name"
          label="Name"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          placeholder="Your Email"
          label="Email"
          keyboardType="email-address"
          containerStyle={styles.marginBottom}
        />
        <AuthInputField
          placeholder="Your Password"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
  },
  marginBottom: {
    marginBottom: 20,
  },
});
