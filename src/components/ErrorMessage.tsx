import React from 'react';
import {ErrorMessage as FormikError} from 'formik';
import {Text, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
type Props = {
  name: string;
};

const ErrorMessage: React.FC<Props> = ({name}) => {
  const style = useStyle();
  return (
    <FormikError name={name}>
      {message => {
        if (typeof message === 'string') {
          return <Text style={style.label}>{message}</Text>;
        } else {
          throw new Error('Invalid error message');
        }
      }}
    </FormikError>
  );
};

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    label: {
      color: colors.error,
      fontSize: 14,
      marginTop: 6,
    },
  });
};

export default ErrorMessage;
