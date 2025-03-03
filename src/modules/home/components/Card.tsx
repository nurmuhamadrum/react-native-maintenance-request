import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';

interface Card {
  title: string;
  status: string;
  date: string;
  isResolved: boolean;
}

const Card = ({title, status, date, isResolved}: Card) => {
  const styles = useStyle();
  return (
    <View style={styles.cardList}>
      <View style={styles.containerCardListTitle}>
        <Text style={styles.titleCardList}>{title}</Text>
        <Text style={styles.titleDate}>{date}</Text>
      </View>
      <View style={[styles.containerCardListTitle, styles.marginCardInside]}>
        <Text style={styles.titleStatus}>{status}</Text>
        <View style={[styles.badges, isResolved && styles.bgGrey]}>
          <Text style={styles.titleBadges}>
            {isResolved ? 'Resolved' : 'Mark as Resolved'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    bgGrey: {
      backgroundColor: colors.secondaryContainer,
    },
    titleStatus: {
      fontSize: 14,
      fontWeight: '300',
      color: colors.error,
    },
    marginCardInside: {marginTop: 10},
    titleBadges: {
      color: colors.onPrimaryContainer,
    },
    badges: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: colors.primary,
      borderRadius: 100,
    },
    titleDate: {
      fontSize: 12,
      color: colors.secondaryContainer,
    },
    titleCardList: {
      color: colors.secondary,
      fontSize: 14,
      fontWeight: '500',
    },
    containerCardListTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardList: {
      padding: 16,
      backgroundColor: colors.onPrimaryContainer,
      borderRadius: 10,
      marginVertical: 10,
      marginHorizontal: 16,
      ...gs.shadow,
    },
  });
};
