import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { configureFonts, MD3LightTheme as LightTheme } from 'react-native-paper';

export const Colors = {
	primary: '#36A388',
	primaryContainer: '#F8F8FF',
	onPrimaryContainer: '#FFFFFF',
	secondary: '#404040',
	secondaryContainer: '#A1AFC3',
	onSecondaryContainer: '#3D3D3D',
	tertiary: '#DCDCDC',
	tertiaryContainer: '#EEFF92',
	onTertiaryContainer: '#445A0D',
	error: '#D74B4B',
};

export const Fonts = {
	ios: {
		bold: {
			fontFamily: 'Roboto-Bold',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Roboto-Medium',
			fontWeight: 'normal',
		},
		regular: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
	},
	android: {
		bold: {
			fontFamily: 'Roboto-Bold',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Roboto-Medium',
			fontWeight: 'normal',
		},
		regular: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Roboto-Regular',
			fontWeight: 'normal',
		},
	},
};

export const Theme: ThemeProp = {
	colors: {
		...LightTheme.colors,
		primary: Colors.primary,
		primaryContainer: Colors.primaryContainer,
		onPrimaryContainer: Colors.onPrimaryContainer,
		secondary: Colors.secondary,
		secondaryContainer: Colors.secondaryContainer,
		onSecondary: Colors.onSecondaryContainer,
		tertiary: Colors.tertiary,
		tertiaryContainer: Colors.tertiaryContainer,
		onTertiaryContainer: Colors.onTertiaryContainer,
		error: Colors.error,
	},
	fonts: configureFonts({ config: Fonts, isV3: true }),
};
