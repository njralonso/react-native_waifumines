<SafeAreaView style={style.container}>
	{!showGame ? (
		<Animated.View style={[style.startScreen, { transform: [{ translateY: titleAnim }] }]}>
			<Animated.Image source={require('./assets/title.png')} style={[style.title, { transform: [{ translateY: titleAnim }] }]} />
			<Animated.View style={{ transform: [{ translateY: buttonAnim }] }}>
				{/* <TouchableOpacity style={style.button} onPress={WaifuSelect}>
			<Image source={require('./assets/images/buttons/home-screen/start.png')} style={style.buttonImage} />
		</TouchableOpacity> */}
				{/* StartGame */}
				<Pressable onPress={waifuSelect}>
					<WaifuSelect handleStartGame={handleStartGame} />
				</Pressable>
				<TouchableOpacity style={style.button} onPress={handleStartGame}>
					<Image source={require('./assets/images/buttons/home-screen/continue.png')} style={style.buttonImage} />
				</TouchableOpacity>
				<TouchableOpacity style={style.button} onPress={handleStartGame}>
					<Image source={require('./assets/images/buttons/home-screen/gallery.png')} style={style.buttonImage} />
				</TouchableOpacity>
				<TouchableOpacity style={style.button} onPress={handleStartGame}>
					<Image source={require('./assets/images/buttons/home-screen/options-home.png')} style={style.buttonImage} />
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	) : (
		<View style={{ 'flex': 1, 'justifyContent': 'center', 'alignItems': 'center' }}>
			<View>
				<View style={{ 'flex': 1, 'flexDirection': 'row', 'justifyContent': 'space-between', 'top': 16, 'marginHorizontal': 8 }}>
					<TouchableOpacity style={style.buttonGame} onPress={handleGoHome}>
						<Image source={require('./assets/images/buttons/ingame/home.png')} style={style.buttonGameImage} />
					</TouchableOpacity>
					<TouchableOpacity style={style.buttonGame} onPress={handleResetGame}>
						<Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} />
					</TouchableOpacity>
				</View>
				<View style={{ 'flex': 4, 'width': '100%' }}>
					<View style={{ 'flexDirection': 'row', 'bottom': 16, 'justifyContent': 'space-evenly' }}>
						<Image source={require('./assets/avatar.png')} style={style.avatar
						} />
						<View style={{ 'justifyContent': 'center', 'alignItems': 'center' }}>
							<Text style={style.waifuData}>Mika</Text>
						</View>
						<View style={{ 'justifyContent': 'center', 'alignItems': 'center' }}>
							<Text style={style.waifuData}>1/3</Text>
						</View>
					</View>
					{!victory ? (
						<ImageBackground source={backgrounds[backgroundIndex]} style={styles.backgroundImage}>
							<Board
								board={board}
								onClick={handleClick}
								onLongPress={handleContextMenu}
							/>
						</ImageBackground>
					) : (
						<View style={style.victoryImage}>
							<Image source={backgrounds[backgroundIndex]} style={style.victoryImageImg} />
						</View>
					)}
				</View>
				<View style={{ 'flex': 1, 'width': '100%', 'flexDirection': 'row', 'justifyContent': 'space-evenly', 'alignItems': 'center', 'bottom': 16 }}>
					{/* <Pressable
				style={{ width: 50, height: 50, objectFit: 'contain' }}
				onPress={handleShowPauseOptions}
			>
				<Pause handleResetGame={handleResetGame} />
			</Pressable> */}
					<TouchableOpacity style={style.buttonGame} onPress={handleResetGame}>
						<Text style={{ 'fontSize': 32 }}>⬅️</Text>
						{/* <Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} /> */}
					</TouchableOpacity>
					<TouchableOpacity style={style.buttonGame} onPress={handleGoNext}>
						{/* <Image source={require('./assets/images/buttons/ingame/options.png')} style={style.buttonGameImage} /> */}
						<Text style={{ 'fontSize': 32 }}>➡️</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
	}
	<StatusBar style="auto" />
</SafeAreaView >