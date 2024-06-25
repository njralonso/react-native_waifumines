import { Pressable } from "react-native"

export default MenuButton = ({ img, onPress }) => {
	return (
		<Pressable onPress={onPress}>
			{img}
		</Pressable>
	)
}