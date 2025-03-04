import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme, TextInput} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';
import {FastField, FastFieldProps} from 'formik';
import ErrorMessage from './ErrorMessage';

type Props = {
  title: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  isMultiline: boolean;
};

const TextField = ({
  title,
  name,
  placeholder,
  isRequired,
  isMultiline,
}: Props) => {
  const styles = useStyle(isMultiline);

  return (
    <View style={styles.container}>
      <Text style={styles.titleField}>
        {title} {isRequired && '*'}
      </Text>
      <View style={styles.dropdown}>
        <FastField name={name}>
          {({field, form}: FastFieldProps) => {
            const handleChangeText = (val: string) => {
              form.handleChange(field.name)(val);
            };

            return (
              <TextInput
                value={form.values[name]}
                placeholder={placeholder}
                onChangeText={(val: string) => handleChangeText(val)}
                selectionColor="#404040"
                activeUnderlineColor={'transparent'}
                underlineColor={'transparent'}
                style={styles.textfield}
                textColor={'#404040'}
                placeholderTextColor={'#DCDCDC'}
                multiline={isMultiline}
                onBlur={() => form.handleBlur(field.name)}
                onFocus={() => form.setFieldTouched(field.name)}
              />
            );
          }}
        </FastField>
      </View>
      <ErrorMessage name={name} />
    </View>
  );
};

export default TextField;

const useStyle = (isMultiline: boolean) => {
  const {colors} = useTheme();
  return StyleSheet.create({
    textfield: {
      backgroundColor: colors.onPrimaryContainer,
      height: 34,
      fontSize: 12,
    },
    container: {
      marginBottom: 25,
    },
    contentMenu: {
      marginTop: 4,
      minWidth: 340,
      alignSelf: 'stretch',
      backgroundColor: colors.onPrimaryContainer,
      borderRadius: 12,
      elevation: 0,
      shadowColor: 'transparent',
    },
    containerItem: {
      backgroundColor: colors.onPrimaryContainer,
      width: '100%',
    },
    iconArrowDown: {
      width: 24,
      height: 24,
    },
    titleField: {
      color: colors.secondaryContainer,
      fontSize: 12,
    },
    titlePlaceholder: {
      color: colors.tertiary,
      fontSize: 12,
      fontWeight: '400',
    },
    dropdown: {
      backgroundColor: colors.onPrimaryContainer,
      marginTop: 8,
      height: isMultiline ? 188 : 52,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      ...gs.shadow,
    },
  });
};
