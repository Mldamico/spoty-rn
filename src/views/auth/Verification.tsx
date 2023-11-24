import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import AppLink from '@ui/AppLink';
import AppButton from '@ui/AppButton';
import OTPField from '@ui/OTPField';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'android/app/src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  const {userInfo} = route.params;

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

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) {
      return;
    }
    try {
      await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('error inside verification ', error);
    }
  };

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
            onChangeText={handlePaste}
            keyboardType="numeric"
            value={otp[index] || ''}
          />
        ))}
      </View>
      <AppButton title="Submit" onPress={handleSubmit} />
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
