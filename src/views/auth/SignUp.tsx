import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import colors from '@utils/colors';
import AuthInputField from '@components/auth/AuthInputField';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="Your Name"
          label="Name"
          containerStyle={styles.marginBottom}
          onChange={text => {
            setUserInfo({...userInfo, name: text});
          }}
        />
        <AuthInputField
          placeholder="Your Email"
          label="Email"
          keyboardType="email-address"
          containerStyle={styles.marginBottom}
          autoCapitalize="none"
          onChange={text => {
            setUserInfo({...userInfo, email: text});
          }}
        />
        <AuthInputField
          placeholder="Your Password"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          onChange={text => {
            setUserInfo({...userInfo, password: text});
          }}
        />
      </View>
      <Button
        title="Sign Up"
        onPress={() => {
          console.log(userInfo);
        }}
      />
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
