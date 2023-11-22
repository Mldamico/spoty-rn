import {StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import AppLink from '@ui/AppLink';
import AppButton from '@ui/AppButton';
import OTPField from '@ui/OTPField';

const otpFields = new Array(6).fill('');

const Verification = () => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value === 'Backspace') {
      if (!newOtp[index]) {
        setActiveOtpIndex(index - 1);
      }
      newOtp[index] = '';
    } else {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <AuthFormContainer heading="Spoty" subHeading="Please look at your email">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => (
          <OTPField
            ref={activeOtpIndex === index ? inputRef : null}
            key={index}
            placeholder="*"
            onKeyPress={({nativeEvent}) => {
              handleChange(nativeEvent.key, index);
            }}
          />
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
