import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import AuthInputField from '@components/auth/AuthInputField';
import {Formik} from 'formik';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}>
        {({handleSubmit, handleChange, values}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="Your Name"
                label="Name"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
              />
              <AuthInputField
                placeholder="Your Email"
                label="Email"
                keyboardType="email-address"
                containerStyle={styles.marginBottom}
                autoCapitalize="none"
                onChange={handleChange('email')}
                value={values.email}
              />
              <AuthInputField
                placeholder="Your Password"
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
              />
              <Button title="Sign Up" onPress={() => handleSubmit()} />
            </View>
          );
        }}
      </Formik>
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
