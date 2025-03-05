import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useTheme, Snackbar} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {globalStyle as gs} from '@/helpers/GlobalStyle';
import {HomeStackParamList} from '@/helpers/StackParamList';
import {useQuery, useMutation} from '@apollo/client';
import {useIsFocused} from '@react-navigation/native';
// components
import Card from '../components/Card';
import LoadingCardTop from '../components/LoadingCardTop';
import CardTop from '../components/CardTop';
import LoadingList from '../components/LoadingList';
import {GET_MAINTENANCE_REQUEST, UPDATE_MAINTENANCE_REQUEST} from '../Query';
import homeStore from '@/stores/HomeStore';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = observer(({navigation}) => {
  const styles = useStyle();
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [titleSnackbar, setTitleSnackbar] = useState<string>('');
  const [openReqCount, setOpenReqCount] = useState<number>(0);
  const [urgentReqCount, setUrgentReqCount] = useState<number>(0);
  const [averageReqCount, setAverageReCount] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // query data maintenance
  const {loading, error, data, refetch} = useQuery(GET_MAINTENANCE_REQUEST);

  const [updateMaintenanceRequest] = useMutation(UPDATE_MAINTENANCE_REQUEST, {
    onCompleted: () => {
      refetch();
      setVisible(true);
      setTitleSnackbar('Success Update Data!');
    },
  });

  const handlerUpdate = (ID: number) => {
    updateMaintenanceRequest({
      variables: {
        id: ID,
        Status: 2, // make status resolved
        IsResolved: true,
      },
    });
  };

  // dismiss error snackbar
  const onDismissSnackBar = () => {
    setVisible(false);
    setTitleSnackbar('');
  };

  // handler count data
  const handlerCount = useCallback(() => {
    let req = homeStore?.maintenanceData || [];
    let filterUrgent = req.filter((val: any) => {
      return val?.Emergency === 3 || val?.Emergency === 4;
    });
    setOpenReqCount(req?.length);
    setUrgentReqCount(filterUrgent?.length);
    setAverageReCount(0);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isFocused]);

  // handler refresh
  const handlerRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, [refetch]);

  useEffect(() => {
    if (data) {
      console.log('New Data from Query:', data.maintenanceRequests);
      homeStore.setMaintenanceData(data.maintenanceRequests); // Update store
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setVisible(true);
      setTitleSnackbar('Failed to Load Data!');
    } else {
      if (data) {
        handlerCount();
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error, data, homeStore, isFocused]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.container}>
      <View style={gs.flex1}>
        <View style={styles.containerTop}>
          {/* Title Section */}
          <Text style={styles.title}>Maintenance Request</Text>

          {/* Card Top Section */}
          {loading ? (
            <View style={styles.containerLoadingTop}>
              <LoadingCardTop />
            </View>
          ) : (
            <View style={styles.containerCardTop}>
              <CardTop title={openReqCount} subtitle="Open Request" />
              <CardTop title={urgentReqCount} subtitle="Urgent Requests" />
              <CardTop
                title={averageReqCount}
                subtitle="Average time (days) to resolve"
              />
            </View>
          )}
        </View>

        {/* Card List Section */}
        <View style={styles.containerList}>
          {loading ? (
            <View style={styles.containerLoadingList}>
              <LoadingList />
            </View>
          ) : (
            <FlatList
              // data={homeStore.maintenanceData}
              data={[...homeStore.maintenanceData]
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.Date).getTime() - new Date(a.Date).getTime(),
                )}
              renderItem={({item}) => (
                <Card
                  title={item?.Title}
                  status={item?.Status}
                  emergency={item?.Emergency}
                  date={item?.Date}
                  isResolved={item?.IsResolved}
                  onPress={() => handlerUpdate(item?.ID)}
                />
              )}
              keyExtractor={item => item?.ID?.toString()}
              style={styles.flatlist}
              ListEmptyComponent={<RenderEmptyData />}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => handlerRefresh()}
                />
              }
            />
          )}
        </View>
      </View>

      {/* Floating Button Action */}
      <Pressable style={styles.fab} onPress={() => navigation.navigate('Form')}>
        <Image
          style={styles.tinyLogo}
          source={require('@/assets/icon-plus.png')}
        />
      </Pressable>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {titleSnackbar}
      </Snackbar>
    </View>
  );
});

const RenderEmptyData = () => {
  const styles = useStyle();
  return (
    <View style={styles.containerEmpty}>
      <Text>Data Not Found!</Text>
    </View>
  );
};

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    containerEmpty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatlist: {
      height: 'auto',
    },
    containerLoadingList: {
      height: '100%',
      width: '100%',
      marginTop: 20,
    },
    containerLoadingTop: {
      height: 100,
      width: '100%',
      marginTop: 20,
    },
    tinyLogo: {
      width: 18,
      height: 18,
    },
    titleStatus: {
      fontSize: 14,
      fontWeight: '300',
      color: colors.error,
    },
    fab: {
      position: 'absolute',
      borderRadius: 100,
      backgroundColor: colors.primary,
      padding: 20,
      right: 30,
      bottom: 50,
    },
    containerList: {
      marginTop: 15,
      paddingBottom: 270,
    },
    containerSubtitleCard: {
      minHeight: 22,
      ...gs.vCenter,
    },
    containerCardTop: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: 20,
      width: '100%',
    },
    subtitleCardTop: {
      color: colors.secondary,
      fontSize: 9,
      textAlign: 'center',
    },
    titleCardTop: {
      fontSize: 36,
      fontWeight: '500',
      color: colors.primary,
    },
    cardTop: {
      width: 100,
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: colors.onPrimaryContainer,
      borderRadius: 10,
      ...gs.vCenter,
      ...gs.vhCenter,
      ...gs.shadow,
    },
    title: {
      color: colors.secondary,
      fontSize: 20,
      ...gs.fwBold,
    },
    containerTop: {
      alignItems: 'center',
      marginTop: 100,
      paddingHorizontal: 16,
    },
    container: {
      backgroundColor: colors.primaryContainer,
      flex: 1,
    },
  });
};

export default HomeScreen;
