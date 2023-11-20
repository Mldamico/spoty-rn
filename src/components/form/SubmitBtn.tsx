import {Button} from 'react-native';
import React, {FC} from 'react';
import {useFormikContext} from 'formik';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = ({title}) => {
  const {handleSubmit} = useFormikContext();
  return <Button title={title} onPress={() => handleSubmit()} />;
};

export default SubmitBtn;
