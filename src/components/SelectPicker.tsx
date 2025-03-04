import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useTheme, Menu} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';
import {FastFieldProps, Field, useField} from 'formik';
import {OptionType} from '@/modules/home/Types';
import ErrorMessage from './ErrorMessage';

export type Option = {
  id: number;
  label: string;
};

type Props = {
  name: string;
  title: string;
  options?: Array<OptionType>;
  placeholder: string;
  isRequired: boolean;
  selectedValue?: OptionType;
};

const SelectPicker = ({
  name,
  title,
  placeholder,
  isRequired,
  options,
  selectedValue,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [, , helper] = useField({name});
  const styles = useStyle();

  const openMenu = () => {
    console.log('Pressed');
    setVisible(true);
  };
  const closeMenu = () => setVisible(false);

  const setFieldValue = useCallback(
    (result?: Option) => {
      helper.setTouched(true);
      if (!result) {
        return;
      }
      helper.setValue([result]);
    },
    [helper],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleField}>
        {title} {isRequired && '*'}
      </Text>
      <Field name={name}>
        {({}: FastFieldProps) => {
          const handlePress = (val: Option) => {
            setFieldValue(val);
            closeMenu();
          };

          return (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchorPosition="bottom"
              contentStyle={styles.contentMenu}
              anchor={
                <Pressable style={styles.dropdown} onPress={() => openMenu()}>
                  <Text
                    style={[
                      styles.titlePlaceholder,
                      selectedValue && styles.colorTitle,
                    ]}>
                    {selectedValue
                      ? selectedValue.label
                      : `Select ${placeholder}`}
                  </Text>
                  <Image
                    style={styles.iconArrowDown}
                    source={require('@/assets/icon-arrow-down.png')}
                  />
                </Pressable>
              }>
              <View style={styles.containerItem}>
                {options?.map((val, key) => {
                  return (
                    <Menu.Item
                      key={key}
                      onPress={() => handlePress(val)}
                      title={val?.label}
                    />
                  );
                })}
              </View>
            </Menu>
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </View>
  );
};

export default SelectPicker;

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
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
    colorTitle: {
      color: colors.secondary,
    },
    titlePlaceholder: {
      color: colors.tertiary,
      fontSize: 12,
      fontWeight: '400',
    },
    dropdown: {
      backgroundColor: colors.onPrimaryContainer,
      marginTop: 8,
      height: 52,
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      ...gs.shadow,
    },
  });
};
