import {StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import CircleUi from '@ui/CircleUi';
import colors from '@utils/colors';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUi position="top-left" size={200} />
      <CircleUi position="top-right" size={100} />
      <CircleUi position="bottom-left" size={100} />
      <CircleUi position="bottom-right" size={200} />

      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

export default AuthFormContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headingContainer: {width: '100%', marginBottom: 10, alignItems: 'center'},
  heading: {
    fontSize: 32,
    color: colors.SECONDARY,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {color: colors.CONTRAST, fontSize: 16, paddingVertical: 10},
});
