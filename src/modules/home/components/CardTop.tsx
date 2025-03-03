import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';

interface CardTop {
  title: string;
  subtitle: string;
}

const CardTop = ({title, subtitle}: CardTop) => {
  const styles = useStyle();
  return (
    <View style={styles.cardTop}>
      <Text style={styles.titleCardTop}>{title}</Text>
      <View style={styles.containerSubtitleCard}>
        <Text style={styles.subtitleCardTop}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default CardTop;

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
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
  });
};
