import {
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import AppInput from '@ui/AppInput';
import colors from '@utils/colors';

interface Props {
  placeholder?: string;
  label?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (text: string) => void;
}

const AuthInputField: FC<Props> = ({
  placeholder,
  label,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  containerStyle,
  onChange,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
      />
    </View>
  );
};

export default AuthInputField;

const styles = StyleSheet.create({
  container: {},
  label: {
    color: colors.CONTRAST,
    padding: 5,
  },
});
