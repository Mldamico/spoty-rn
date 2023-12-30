import {Pressable, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';
import colors from '@utils/colors';

interface Props {
  title: string;
  active?: boolean;
  onPress?(): void;
}

const AppLink: FC<Props> = ({title, active = true, onPress}) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{opacity: active ? 1 : 0.4}}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default AppLink;

const styles = StyleSheet.create({
  title: {
    color: colors.SECONDARY,
  },
});
