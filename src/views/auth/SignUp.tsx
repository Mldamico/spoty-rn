import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '@utils/colors';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';

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
      <Form
        validationSchema={signupSchema}
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}>
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Your Name"
            label="Name"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="Your Email"
            label="Email"
            keyboardType="email-address"
            containerStyle={styles.marginBottom}
            autoCapitalize="none"
          />
          <AuthInputField
            name="password"
            placeholder="Your Password"
            label="Password"
            autoCapitalize="none"
            secureTextEntry
            containerStyle={styles.marginBottom}
          />
          <SubmitBtn title="Sign up" />
        </View>
      </Form>
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
