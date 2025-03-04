import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Appbar, Text, AppbarProps} from 'react-native-paper';
import {ParamListBase, Route} from '@react-navigation/native';
import {getHeaderTitle} from '@react-navigation/elements';
import {useTheme} from 'react-native-paper';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {globalStyle as gs} from '@/helpers/GlobalStyle';

export type OptionType = {
  mode?: AppbarProps['mode'];
};

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: Route<string>;
  options: NativeStackNavigationOptions & OptionType;
};

const AppHeader: React.FC<Props> = ({navigation, route, options}) => {
  const {mode} = options;
  const getTitle = getHeaderTitle(options, route.name) as string | (() => string);
  const styles = useStyle();

  const goBack = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
      setTimeout(() => {
        navigation.goBack();
      }, 200);
      return;
    }
    navigation.goBack();
  };

  const getTitleText = (): string => {
    return typeof getTitle === 'string' ? getTitle : getTitle();
  };

  return (
    <>
      <Appbar.Header mode={mode || 'center-aligned'} style={styles.header}>
        <View style={styles.headerContainer}>
          <View style={styles.containerLeft}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image
                style={styles.arrow}
                source={require('@/assets/icon-arrow.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.containerMiddle]}>
            <Text numberOfLines={2} style={[styles.titleText]}>
              {getTitleText()}
            </Text>
          </View>
          <View style={[styles.containerRight]}/>
        </View>
      </Appbar.Header>
    </>
  );
};

const useStyle = () => {
  const {colors} = useTheme();
  return StyleSheet.create({
    header: {
      backgroundColor: colors.primaryContainer,
      elevation: 0,
      shadowOpacity: 0,
      height: 60,
    },
    containerLeft: {
      flex: 0.25,
      justifyContent: 'center',
    },
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 0,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    arrow: {
      width: 20,
      height: 20,
    },
    containerMiddle: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 0,
      height: '100%',
    },
    titleText: {
      ...gs.fwBold,
      width: '100%',
      textAlign: 'center',
      color: 'black',
      flexWrap: 'wrap',
      zIndex: 0,
      flexShrink: 1,
      fontSize: 18,
    },
    containerRight: {
		flexDirection: 'row',
		flex: 0.25,
		gap: 100,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
  });
};

export default AppHeader;
