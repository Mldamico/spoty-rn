import {StyleSheet, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import OPTField from '@ui/OPTField';
import AppLink from '@ui/AppLink';
import AppButton from '@ui/AppButton';

const optFields = new Array(6).fill('');

const Verification = () => {
  // const [otp, setOtp] = useState([...optFields]);
  const inputRef = useRef<TextInput>(null);

  return (
    <AuthFormContainer heading="Spoty" subHeading="Please look at your email">
      <View style={styles.inputContainer}>
        {optFields.map((_, index) => (
          <OPTField ref={inputRef} key={index} placeholder="*" />
        ))}
      </View>
      <AppButton title="Submit" />
      <View style={styles.linkContainer}>
        <AppLink title="Re send OTP" />
      </View>
    </AuthFormContainer>
  );
};

export default Verification;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
});
