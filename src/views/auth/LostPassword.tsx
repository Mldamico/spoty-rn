import {StyleSheet, View} from 'react-native';
import React from 'react';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';

const lostPasswordSchema = yup.object({
  email: yup
    .string()
    .trim("Email can't contain spaces")
    .required("Email can't be empty")
    .email('Invalid email'),
});

const initialValues = {
  email: '',
};

const LostPassword = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <Form
      validationSchema={lostPasswordSchema}
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
      }}>
      <AuthFormContainer heading="Spoty" subHeading="Forgot your password?">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="Your Email"
            label="Email"
            keyboardType="email-address"
            containerStyle={styles.marginBottom}
            autoCapitalize="none"
          />

          <SubmitBtn title="Send link" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('SignIn')}
            />
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default LostPassword;

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  formContainer: {
    width: '80%',
  },
  marginBottom: {
    marginBottom: 20,
  },
});
