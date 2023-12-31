import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {FormikHelpers} from 'formik';
import {updateLoggedInState, updateProfile} from 'src/store/auth';
import {useDispatch} from 'react-redux';

const signinSchema = yup.object({
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
  email: '',
  password: '',
};

interface SignInUserInfo {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: SignInUserInfo,
    actions: FormikHelpers<SignInUserInfo>,
  ) => {
    actions.setSubmitting(true);
    try {
      console.log(values);
      const {data} = await client.post('/auth/sign-in', {
        ...values,
      });

      dispatch(updateProfile(data.profile));
      dispatch(updateLoggedInState(true));
    } catch (error) {
      console.log('Sign in error: ', error);
    }
    actions.setSubmitting(false);
  };
  return (
    <Form
      validationSchema={signinSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <AuthFormContainer heading="Spoty" subHeading="Welcome back!">
        <View style={styles.formContainer}>
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
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => setSecureEntry(!secureEntry)}
          />
          <SubmitBtn title="Sign in" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('LostPassword')}
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

export default SignIn;

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
