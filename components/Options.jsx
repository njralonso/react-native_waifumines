import { View, Text, Pressable, Image } from "react-native"

let waifuInfo = [{
	'name': 'Airi',
	'age': 22,
	'img': require('../assets/images/characters/avatar.png')
},
{
	'name': 'Mika',
	'age': 24,
	'img': require('../assets/images/characters/avatar.png')
},
{
	'name': 'Sora',
	'age': 20,
	'img': require('../assets/images/characters/avatar.png')
},
{
	'name': 'Miku',
	'age': 18,
	'img': require('../assets/images/characters/avatar.png')
}
]

export default Options = () => {
	return (
		<View style={{ 'flex': 1 }}>
			{
				waifuInfo.map((waifu, index) => {
					return (
						<View key={index} style={{ 'backgroundColor': 'red', 'flexDirection': 'row', 'alignItems': 'center' }}>
							<Pressable name={waifu.name} age={waifu.age} >
								<Image style={{ 'width': 150, 'height': 150, }} source={waifu.img} />
							</Pressable>
							<View>
								<Text>
									Name: {waifu.name}
								</Text>
								<Text>
									Age: {waifu.age}
								</Text>
							</View>
						</View>
					)
				})
			}
		</View >
	)
}
