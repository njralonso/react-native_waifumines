import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	app: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	board: {
		display: 'grid',  // React Native no tiene soporte directo para grid, puedes usar flexbox
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 400,  // 10 * 40 (asumiendo 10 columnas de 40px)
		height: 400,  // 10 * 40 (asumiendo 10 filas de 40px)
		position: 'relative',
		backgroundImage: 'url(assets/buscaminas-1.jpeg)',  // Esto no funciona directamente en React Native
		backgroundSize: 'cover',  // Lo puedes lograr con un ImageBackground en React Native

	},
	victory: {
		backgroundImage: 'url(assets/buscaminas-1.jpeg)',
		backgroundSize: 'cover',
	},
	cell: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
	},
	hidden: {
		backgroundColor: '#fff',
		backgroundImage: 'url(./assets/hidden.png)',
	},
	revealed: {
		backgroundColor: '#fff',
	},
	empty: {
		backgroundColor: '#000000A3',
	},
	number: {
		backgroundColor: '#ddd',
	},
	bomb: {
		justifyContent: 'flex-start',
		alignItems: 'start',
	},
	bombImage: {
		width: 40,
		height: 40,
		resizeMode: 'cover',
	},
	flagged: {
		backgroundColor: 'yellow',
	},
	victoryImage: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 400,
		width: 400,
	},
	victoryImageImg: {
		maxWidth: '100%',
		maxHeight: '100%',
	},
});
