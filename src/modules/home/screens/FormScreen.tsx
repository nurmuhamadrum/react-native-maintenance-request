import React, {useCallback, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@/helpers/StackParamList';
import {useTheme, Button} from 'react-native-paper';
import {SelectPicker, TextField} from '@/components';
import {Formik, FormikProps} from 'formik';
import {FormCreate} from '../Types';
import {initValueForm, validationFormSchema} from '../Helpers';
import {useFormikContext} from 'formik';

type Props = NativeStackScreenProps<HomeStackParamList, 'Form'>;

const FormScreen: React.FC<Props> = () => {
  const styles = useStyle();
  const formikRefForm = useRef<FormikProps<FormCreate>>(null);

  // handler submit form
  const handleSubmitForm = useCallback(async (values: FormCreate) => {
    try {
      console.log(values);
    } catch (error) {
      console.log('Error in handleSubmitForm', error);
    }
  }, []);

  // handle submit
  const handleSubmit = useCallback(async () => {
    if (formikRefForm.current) {
      await Promise.all([formikRefForm.current.submitForm()]);
      const itemErrors = formikRefForm.current.errors;
      if (Object.keys(itemErrors).length === 0) {
        // here
      } else {
        console.log('Error in handleSubmit', {itemErrors});
      }
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerForm}>
        <Formik
          innerRef={formikRefForm}
          initialValues={initValueForm}
          onSubmit={handleSubmitForm}
          validationSchema={validationFormSchema}>
          <RenderForm handleSubmit={handleSubmit} />
        </Formik>
      </View>
    </ScrollView>
  );
};

const RenderForm = ({ handleSubmit }: any) => {
  const styles = useStyle();
  const formik = useFormikContext<FormCreate>();
  const {values} = formik;
  const urgencyData = [
    {
      id: 1,
      label: 'Non Urgent',
    },
    {
      id: 2,
      label: 'Less Urgent',
    },
    {
      id: 3,
      label: 'Urgent',
    },
    {
      id: 4,
      label: 'Emergency',
    },
  ];
  const statusData = [
    {
      id: 1,
      label: 'Open',
    },
    {
      id: 2,
      label: 'Resolve',
    },
  ];

  return (
    <>
      {/* Field Urgency */}
      <SelectPicker
        name="urgency"
        title="Urgency"
        placeholder="Urgency"
        isRequired
        options={urgencyData}
        selectedValue={values.urgency?.[0]}
      />

      {/* Field Status */}
      <SelectPicker
        name="status"
        title="Status"
        placeholder="Status"
        isRequired
        options={statusData}
        selectedValue={values.status?.[0]}
      />

      {/* Field Title */}
      <TextField
        title="Title"
        name="title"
        placeholder="eg. Crack in Plasterboard"
        isRequired
        isMultiline={false}
      />

      {/* Field Description */}
      <TextField
        title="Description"
        name="description"
        placeholder="Description of your request"
        isRequired
        isMultiline
      />

      {/* Button Submit */}
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.titleButton}
        onPress={() => handleSubmit()}>
        Save
      </Button>
    </>
  );
};

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    titleButton: {fontSize: 18},
    button: {
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 66,
    },
    containerForm: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.primaryContainer,
      padding: 30,
    },
  });
};

export default FormScreen;
