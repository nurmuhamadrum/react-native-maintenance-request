import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '@/helpers/StackParamList';
import {useTheme, Button, Snackbar} from 'react-native-paper';
import {SelectPicker, TextField} from '@/components';
import {Formik, FormikProps} from 'formik';
import {FormCreate} from '../Types';
import {initValueForm, validationFormSchema} from '../Helpers';
import {useFormikContext} from 'formik';
import {useMutation, useQuery} from '@apollo/client';
import {ADD_MAINTENANCE_REQUEST, GET_EMERGENCY, GET_STATUSES} from '../Query';
import homeStore from '@/stores/HomeStore';

type Props = NativeStackScreenProps<HomeStackParamList, 'Form'>;

const FormScreen: React.FC<Props> = ({navigation}) => {
  const styles = useStyle();
  const formikRefForm = useRef<FormikProps<FormCreate>>(null);
  const [visible, setVisible] = useState(false);

  const [addMaintenanceRequest] = useMutation(ADD_MAINTENANCE_REQUEST, {
    refetchQueries: ['GetMaintenanceRequests'],
    onCompleted: data => {
      if (data?.addMaintenanceRequest) {
        homeStore.setMaintenanceData([
          ...homeStore.maintenanceData,
          data.addMaintenanceRequest,
        ]);
      }
    },
  });

  // dismiss error snackbar
  const onDismissSnackBar = () => setVisible(false);

  // handler submit form
  const handleSubmitForm = useCallback(
    async (values: FormCreate) => {
      try {
        const {data} = await addMaintenanceRequest({
          variables: {
            Status: values?.status?.[0]?.id,
            Emergency: values?.urgency?.[0]?.id,
            Title: values?.title,
            Description: values?.description,
            Date: new Date().toISOString(),
            IsResolved: values?.status?.[0]?.id === 1 ? false : true,
          },
        });

        if (data?.addMaintenanceRequest) {
          setVisible(true);
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }, 500);
        }
      } catch (err) {
        console.error('Error in handleSubmitForm:', err);
      }
    },
    [addMaintenanceRequest, navigation],
  );

  // handle submit
  const handleSubmit = useCallback(async () => {
    if (formikRefForm.current) {
      await Promise.all([formikRefForm.current.submitForm()]);
      const itemErrors = formikRefForm.current.errors;
      if (Object.keys(itemErrors).length === 0) {
        // handle if needed
      } else {
        console.log('Error in handleSubmit', {itemErrors});
      }
    }
  }, []);

  return (
    <>
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
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            setVisible(false);
          },
        }}>
        Succes Save Data!
      </Snackbar>
    </>
  );
};

const RenderForm = ({handleSubmit}: any) => {
  const styles = useStyle();
  const formik = useFormikContext<FormCreate>();
  const {values} = formik;
  const [statusData, setStatusData] = useState([]);
  const [urgencyData, setUrgencyData] = useState([]);

  const {data: statusesData} = useQuery(GET_STATUSES);
  const {data: emergencyData} = useQuery(GET_EMERGENCY);

  useEffect(() => {
    const status = statusesData?.statuses.map(
      ({ID, NamaStatus}: {ID: number; NamaStatus: string}) => ({
        id: ID,
        label: NamaStatus,
      }),
    );
    const emergency = emergencyData?.emergencies.map(
      ({ID, EmergencyName}: {ID: number; EmergencyName: string}) => ({
        id: ID,
        label: EmergencyName,
      }),
    );
    setStatusData(status);
    setUrgencyData(emergency);
  }, [statusesData?.statuses, emergencyData]);

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
