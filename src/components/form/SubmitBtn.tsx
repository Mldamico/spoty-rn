import React, {FC} from 'react';
import {useFormikContext} from 'formik';
import AppButton from '@ui/AppButton';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = ({title}) => {
  const {handleSubmit} = useFormikContext();
  return <AppButton title={title} onPress={() => handleSubmit()} />;
};

export default SubmitBtn;
