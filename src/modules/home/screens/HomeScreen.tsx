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
import {useQuery, gql} from '@apollo/client';
// components
import Card from '../components/Card';
import LoadingCardTop from '../components/LoadingCardTop';
import CardTop from '../components/CardTop';
import LoadingList from '../components/LoadingList';
// import homeStore from '@/stores/HomeStore';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = observer(({navigation}) => {
  const styles = useStyle();
  const [visible, setVisible] = useState(false);
  const [openReqCount, setOpenReqCount] = useState<string>('0');
  const [urgentReqCount, setUrgentReqCount] = useState<string>('0');
  const [averageReqCount, setAverageReCount] = useState<string>('0');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // get maintenance request data
  const GET_MAINTENANCE_REQUEST = gql`
    query GetMaintenaceRequest {
      maintenanceRequests {
        ID
        Status
        Emergency
        Title
        Description
        IsResolved
        Date
      }
    }
  `;

  // query data maintenance
  const {loading, error, data, refetch} = useQuery(GET_MAINTENANCE_REQUEST);

  // dismiss error snackbar
  const onDismissSnackBar = () => setVisible(false);

  // handler count data
  const handlerCount = useCallback(() => {
    let req = data?.maintenanceRequests || [];
    let filterUrgent = req.filter((val: any) => {
      return val?.Emergency === 3;
    });
    setOpenReqCount(req?.length);
    setUrgentReqCount(filterUrgent?.length);
    setAverageReCount('0');
  }, [data?.maintenanceRequests]);

  // handler refresh
  const handlerRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, [refetch]);

  useEffect(() => {
    if (error) {
      setVisible(true);
    } else {
      if (data) {
        handlerCount();
      }
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [error, data]);

  return (
    <View style={styles.container}>
      <View>
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
              data={data?.maintenanceRequests}
              renderItem={({item}) => (
                <Card
                  title={item?.Title}
                  status={item?.Status}
                  date={item?.Date}
                  isResolved={item?.IsResolved}
                />
              )}
              keyExtractor={item => item.ID.toString()}
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
        Failed to Load Data!
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
    flatlist: {height: '100%'},
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
      height: '100%',
    },
  });
};

export default HomeScreen;
