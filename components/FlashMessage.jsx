import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const FlashMessage = ({ message, visible }) => {
	const scale = useSharedValue(1);

	useEffect(() => {
		if (visible) {
			scale.value = withTiming(0, {
				duration: 500,
				easing: Easing.out(Easing.ease),
			}, () => {
				scale.value = withTiming(0, {
					duration: 500,
					easing: Easing.in(Easing.ease),
				});
			});
		}
	}, [visible]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: `scale(${scale.value})`, // Usar cadena en lugar de array
		};
	}, [scale.value]); // Array de dependencias añadido aquí

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.flashMessage, animatedStyle]}>
				<Text style={styles.messageText}>{message}</Text>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flashMessage: {
		padding: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 10,
	},
	messageText: {
		color: '#fff',
		fontSize: 16,
	},
});

export default FlashMessage;
