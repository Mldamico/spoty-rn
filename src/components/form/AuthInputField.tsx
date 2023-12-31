import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, useCallback, useEffect} from 'react';
import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {useFormikContext} from 'formik';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  name: string;
  placeholder?: string;
  label?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: ReactNode;
  onRightIconPress?(): void;
}

const AuthInputField: FC<Props> = ({
  name,
  placeholder,
  label,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  containerStyle,
  rightIcon,
  onRightIconPress,
}) => {
  const inputTransformValue = useSharedValue(0);
  const {handleChange, values, errors, touched, handleBlur} = useFormikContext<{
    [key: string]: string;
  }>();

  const errorMsg = errors[name] && touched[name] ? errors[name] : null;

  const shakeUI = useCallback(() => {
    inputTransformValue.value = withSequence(
      withTiming(-10, {duration: 50}),
      withSpring(0, {
        damping: 10,
        mass: 0.5,
        stiffness: 1000,
        restDisplacementThreshold: 0.1,
      }),
    );
  }, [inputTransformValue]);

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: inputTransformValue.value}],
    };
  });

  useEffect(() => {
    if (errorMsg) {
      shakeUI();
    }
  }, [errorMsg, shakeUI]);

  return (
    <Animated.View style={[containerStyle, inputStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      </View>
      <View>
        <AppInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange(name)}
          value={values[name]}
          onBlur={handleBlur(name)}
        />
        {rightIcon ? (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
};

export default AuthInputField;

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  rightIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.CONTRAST,
  },
  errorMsg: {
    color: colors.ERROR,
  },
});
