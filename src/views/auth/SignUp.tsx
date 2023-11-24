import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AuthInputField from '@components/form/AuthInputField';
import * as yup from 'yup';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import PasswordVisibilityIcon from '@ui/PasswordVisibilityIcon';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {FormikHelpers} from 'formik';
import axios from 'axios';
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

interface NewUser {
  name: '';
  email: '';
  password: '';
}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    try {
      const response = await axios.post('http://localhost:4444/auth/signup', {
        ...values,
      });
      console.log(response.data);
    } catch (error) {
      console.log('Sign up error: ', error);
    }
  };

  return (
    <Form
      validationSchema={signupSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}>
      <AuthFormContainer
        heading="Spoty"
        subHeading="Let's get started by creating your account.">
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
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureEntry} />}
            onRightIconPress={() => setSecureEntry(!secureEntry)}
          />
          <SubmitBtn title="Sign up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('LostPassword')}
            />
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default SignUp;

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
