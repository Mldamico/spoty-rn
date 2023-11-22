import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React, {FC, forwardRef} from 'react';
import colors from '@utils/colors';

interface Props extends TextInputProps {
  ref: any;
}

const OPTField: FC<Props> = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
});

export default OPTField;

const styles = StyleSheet.create({
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.SECONDARY,
    borderWidth: 2,
    textAlign: 'center',
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});
