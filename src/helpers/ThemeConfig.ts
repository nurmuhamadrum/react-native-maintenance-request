import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { configureFonts, MD3LightTheme as LightTheme } from 'react-native-paper';

export const Colors = {
	primary: '#FDBA12',
	primaryContainer: '#FDE58A',
	onPrimaryContainer: '#7C3E0B',
	secondary: '#999999',
	secondaryContainer: '#D1D1D1',
	onSecondaryContainer: '#3D3D3D',
	tertiary: '#CCFB20',
	tertiaryContainer: '#EEFF92',
	onTertiaryContainer: '#445A0D',
	error: '#BA1A1A',
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
