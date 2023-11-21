import {FlexStyle, View} from 'react-native';
import React, {FC} from 'react';
import colors from '@utils/colors';

interface Props {
  size: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CircleUi: FC<Props> = ({size, position}) => {
  let viewPosition: FlexStyle = {};

  switch (position) {
    case 'top-left':
      viewPosition = {top: -size / 2, left: -size / 2};
      break;
    case 'top-right':
      viewPosition = {top: -size / 2, right: -size / 2};
      break;
    case 'bottom-left':
      viewPosition = {bottom: -size / 2, left: -size / 2};
      break;
    case 'bottom-right':
      viewPosition = {bottom: -size / 2, right: -size / 2};
      break;

    default:
      break;
  }

  return (
    <View
      style={{
        width: size,
        height: size,

        position: 'absolute',
        ...viewPosition,
      }}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
          borderRadius: size / 2,
        }}
      />
      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
          borderRadius: size / 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{translateX: -size / 3}, {translateY: -size / 3}],
        }}
      />
    </View>
  );
};

export default CircleUi;
