import {StackNavigator, TabNavigator} from 'react-navigation';

const Tab = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./resource/icons/pfb_tabbar_homepage.png")}
                        style={[{tintColor: tintColor}, styles.icon]}
                    />
                ),
            }),
        },
        Nearby: {
            screen: Nearby,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Nearby',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./resource/icons/pfb_tabbar_merchant.png")}
                        style={[{tintColor: tintColor}, styles.icon]}
                    />
                ),
            }),
        },
        Message: {
            screen: Message,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Message',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./resource/icons/pfb_tabbar_discover.png")}
                        style={[{tintColor: tintColor}, styles.icon]}
                    />
                ),
            }),
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require("./resource/icons/pfb_tabbar_mine.png")}
                        style={[{tintColor: tintColor}, styles.icon]}
                    />
                ),
            }),
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
    },
);
