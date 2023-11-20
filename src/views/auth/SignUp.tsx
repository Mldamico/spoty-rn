import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import AuthInputField from '@components/auth/AuthInputField';
import {Formik} from 'formik';
import * as yup from 'yup';

const signupSchema = yup.object({
  name: yup
    .string()
    .trim("Name can't contain spaces")
    .required("Name can't be empty")
    .min(3, "Name can't be less than 3 characters"),
  email: yup
    .string()
    .trim("Email can't contain spaces")
    .required("Email can't be empty")
    .email('Invalid email'),
  password: yup
    .string()
    .trim("Password can't contain spaces")
    .required('')
    .min(6, 'Password is too short!'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={signupSchema}
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}>
        {({handleSubmit, handleChange, errors, values}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                placeholder="Your Name"
                label="Name"
                containerStyle={styles.marginBottom}
                onChange={handleChange('name')}
                value={values.name}
                errorMsg={errors.name}
              />
              <AuthInputField
                placeholder="Your Email"
                label="Email"
                keyboardType="email-address"
                containerStyle={styles.marginBottom}
                autoCapitalize="none"
                onChange={handleChange('email')}
                value={values.email}
                errorMsg={errors.email}
              />
              <AuthInputField
                placeholder="Your Password"
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChange={handleChange('password')}
                value={values.password}
                errorMsg={errors.password}
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
