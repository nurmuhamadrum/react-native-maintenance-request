import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {globalStyle as gs} from '@/helpers/GlobalStyle';
import {useQuery, gql} from '@apollo/client';

interface Card {
  title: string;
  status: number;
  date: string;
  isResolved: boolean;
}

const Card = ({title, status, date, isResolved}: Card) => {
  const styles = useStyle();
  const [emergencyTitle, setEmergencyTitle] = useState<string>('-');

  // get emergencys data
  const GET_EMERGENCYS = gql`
    query GetEmergency {
      emergencies {
        ID
        EmergencyName
      }
    }
  `;

  const {error, data} = useQuery(GET_EMERGENCYS);

  useEffect(() => {
    if (data && !error) {
      // find emergency title
      let find = data?.emergencies.find((val: any) => {
        return val.ID === status;
      });
      setEmergencyTitle(find?.EmergencyName || '-');
    }
  }, [data, status, error]);

  return (
    <View style={styles.cardList}>
      <View style={styles.containerCardListTitle}>
        <Text style={styles.titleCardList}>{title}</Text>
        <Text style={styles.titleDate}>{date}</Text>
      </View>
      <View style={[styles.containerCardListTitle, styles.marginCardInside]}>
        <Text style={styles.titleStatus}>{emergencyTitle}</Text>
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
