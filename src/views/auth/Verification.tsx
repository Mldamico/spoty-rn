import {Keyboard, StyleSheet, TextInput, View, Text} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import AuthFormContainer from '@components/auth/AuthFormContainer';
import AppLink from '@ui/AppLink';
import AppButton from '@ui/AppButton';
import OTPField from '@ui/OTPField';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'src/@types/navigation';
import client from 'src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import colors from '@utils/colors';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const [countDown, setCountDown] = useState(60);
  const [canSendNewOtpRequest, setCanSendNewOtpRequest] = useState(false);
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  const {userInfo} = route.params;

  const handleChange = (value: string, index: number) => {
    console.log({value, index});
    const newOtp = [...otp];
    if (value === 'Backspace') {
      if (!newOtp[index]) {
        setActiveOtpIndex(index - 1);
      }
      // newOtp[index] = '';
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

  const requestOTP = async () => {
    setCountDown(30);
    setCanSendNewOtpRequest(false);
    try {
      await client.post('/auth/re-verify-email', {userId: userInfo.id});
    } catch (error) {
      console.log('Requesting for new otp error: ', error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSendNewOtpRequest) {
      return;
    }
    const intervalId = setInterval(() => {
      setCountDown(oldCd => {
        if (oldCd <= 0) {
          setCanSendNewOtpRequest(true);
          clearInterval(intervalId);
          return 0;
        }
        return oldCd - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [canSendNewOtpRequest]);

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) {
      return;
    }
    setIsSubmitting(true);
    try {
      await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('error inside verification ', error);
    }
    setIsSubmitting(false);
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
      <AppButton busy={isSubmitting} title="Submit" onPress={handleSubmit} />
      <View style={styles.linkContainer}>
        {countDown > 0 ? (
          <Text style={styles.countdown}>{countDown} seconds</Text>
        ) : null}
        <AppLink
          active={canSendNewOtpRequest}
          title="Re send OTP"
          onPress={requestOTP}
        />
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
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  countdown: {
    color: colors.SECONDARY,
    marginRight: 10,
  },
});
