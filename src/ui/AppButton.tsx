import {Pressable, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import colors from '@utils/colors';
import Loader from './Loader';

interface Props {
  title: string;
  busy?: boolean;
  onPress?(): void;
}

const AppButton: FC<Props> = ({title, busy, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {!busy ? <Text style={styles.title}>{title}</Text> : <Loader />}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  title: {
    color: colors.CONTRAST,
    fontSize: 18,
  },
});
