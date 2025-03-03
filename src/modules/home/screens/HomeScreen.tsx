import React from 'react';
import {Text, View, StyleSheet, Pressable, Image, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useTheme} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';
// components
import Card from '../components/Card';
import CardTop from '../components/CardTop';
// import homeStore from '@/stores/HomeStore';

const HomeScreen = observer(() => {
  const styles = useStyle();
  const data = [
    {
      id: 1,
      title: 'Front Door Lock Broken',
      status: 'Urgent',
      date: '11 Dec 2025',
      isResolve: false,
    },
    {
      id: 2,
      title: 'Title Cracked',
      status: 'Non Urgent',
      date: '11 Dec 2025',
      isResolve: false,
    },
    {
      id: 3,
      title: 'Water Pipe Leaking',
      status: 'Emergency',
      date: '11 Dec 2025',
      isResolve: true,
    },
    {
      id: 4,
      title: 'Cornice Cracked',
      status: 'Less Urgent',
      date: '11 Dec 2025',
      isResolve: true,
    },
    {
      id: 5,
      title: 'Front Door Lock Broken',
      status: 'Urgent',
      date: '11 Dec 2025',
      isResolve: true,
    },
    {
      id: 6,
      title: 'Front Door Lock Broken',
      status: 'Urgent',
      date: '11 Dec 2025',
      isResolve: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerTop}>
          {/* Title Section */}
          <Text style={styles.title}>Maintenance Request</Text>

          {/* Card Top Section */}
          <View style={styles.containerCardTop}>
            <CardTop title="2" subtitle="Open Request" />
            <CardTop title="14" subtitle="Urgent Requests" />
            <CardTop title="9" subtitle="Average time (days) to resolve" />
          </View>
        </View>

        {/* Card List Section */}
        <View style={styles.containerList}>
          <FlatList
            data={data}
            renderItem={({item}) => <Card title={item?.title} status={item?.status} date={item?.date} isResolved={item?.isResolve}  />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>

      {/* Floating Button Action */}
      <Pressable style={styles.fab}>
        <Image
          style={styles.tinyLogo}
          source={require('@/assets/icon-plus.png')}
        />
      </Pressable>
    </View>
  );
});

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
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
