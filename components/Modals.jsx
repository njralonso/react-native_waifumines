import { Modal, View } from "react-native"
import { useState } from "react"

const Modals = ({ children, visible }) => {
	const []
	return (
		<View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={true}
			>
				{children}
			</Modal>
		</View>
	)
}

export default Modals