import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ScanScreen from "./Scan";

const insights = [
  { id: "1", title: "Scan new", subtitle: "Scanned 483", icon: "scan-outline", color: "#D6CCFF" },
  { id: "2", title: "Counterfeits", subtitle: "Counterfeited 32", icon: "alert-circle-outline", color: "#FFE3D6" },
  { id: "3", title: "Success", subtitle: "Checkouts 8", icon: "checkmark-circle-outline", color: "#D6F8E3" },
  { id: "4", title: "Directory", subtitle: "History 26", icon: "calendar-outline", color: "#D6EBFF" },
];

const productImages = [
  require("./assets/products_1.png"),
  require("./assets/products_2.png"),
  require("./assets/products_3.png"),
];
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.username}>Christie Doe</Text>
        </View>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.profilePic}
        />
      </View>
      <Text style={styles.sectionTitle}>Your Insights</Text>
      <View style={styles.insightsContainer}>
        {insights.map((item) => (
          <View key={item.id} style={[styles.insightCard, { backgroundColor: item.color }]}>
            <Icon name={item.icon} size={30} color="#333" />
            <Text style={styles.insightTitle}>{item.title}</Text>
            <Text style={styles.insightSubtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </View>
      <View style={styles.exploreContainer}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <TouchableOpacity>
          <Icon name="arrow-forward-outline" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={productImages}
        renderItem={({ item }) => (
          <Image source={item} style={styles.productImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const unreadNotifications = 3;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Notification") iconName = "notifications-outline";
            else if (route.name === "Scan") iconName = "scan-outline";
            else if (route.name === "History") iconName = "time-outline";
            else if (route.name === "Cart") iconName = "cart-outline";
            return (
              <View>
                <Icon name={iconName} size={size} color={color} />
                {route.name === "Notification" && unreadNotifications > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadNotifications}</Text>
                  </View>
                )}
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notification" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="History" component={HomeScreen} />
        <Tab.Screen name="Cart" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 18, fontWeight: "bold" },
  username: { fontSize: 16, color: "#555" },
  profilePic: { width: 40, height: 40, borderRadius: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 20, },
  insightsContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20, },
  insightCard: {
    width: "48%",
    height: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  insightTitle: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
  insightSubtitle: { fontSize: 12, color: "#666" },
  exploreContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  productPlaceholder: { width: 100, height: 100, backgroundColor: "#eee", borderRadius: 10, marginRight: 10 },
  tabBar: { height: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#fff", elevation: 10 },
  badge: {
    position: "absolute",
    right: -6,
    top: -2,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: "cover", // Giúp ảnh hiển thị đẹp hơn
  },

});

export default App;
