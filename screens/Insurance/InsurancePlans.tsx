import React, { useCallback, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import boxes from "../../constants/insuranceplans";

const { width, height } = Dimensions.get("screen");

const InsuranceOptions = () => {
    const { navigate } = useNavigation<any>();
    const scrollX = useRef(new Animated.Value(0)).current;

    const navigateToApply = (plan: string) => {
        navigate("InsuranceMain", {
            plan: plan,
        });
    };

    useFocusEffect(
        useCallback(() => {
        }, []),
    );


    return (
        <Animated.FlatList
            data={boxes}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentContainer}
            snapToAlignment="center"
            decelerationRate="fast"
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false },
            )}
            renderItem={({ item, index }) => {
                const inputRange = [
                    (index - 1) * (width * 0.8),
                    index * (width * 0.8),
                    (index + 1) * (width * 0.8),
                ];

                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1, 0.8],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: "clamp",
                });

                return (
                    <Animated.View
                        style={[styles.box, { transform: [{ scale }], opacity }]}
                    >
                        <Text style={styles.planLabel}>{item.label}</Text>
                        <View style={styles.boxDescriptionContainer}>
                            {item.description.map((desc, index) => (
                                <View key={index} style={styles.listItem}>
                                    <Text style={styles.boxDescriptionTitle}>{desc.title}</Text>
                                    <Text style={styles.boxDescriptionValue}>{desc.value}</Text>
                                </View>
                            ))}
                        </View>
                        <TouchableOpacity
                            style={styles.applyButton}
                            onPress={() => navigateToApply(item.label)}
                        >
                            <Text style={styles.applyButtonText}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                );
            }}
        />
    );
};

export default InsuranceOptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    flatListContentContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: (width - width * 0.85) / 2,
    },
    box: {
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 20,
        justifyContent: "center",
        shadowColor: "#929292",
        shadowOffset: { width: 2, height: 2 },
        elevation: 6,
        alignItems: "center",
        marginHorizontal: 10,
        padding: 20,
    },
    planLabel: {
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 20,
    },
    boxDescriptionContainer: {
        width: "100%",
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
    boxDescriptionTitle: {
        fontSize: 16,
        textAlign: "left",
        flex: 1,
        paddingRight: 10,
    },
    boxDescriptionValue: {
        fontSize: 16,
        textAlign: "right",
        flex: 1,
    },
    applyButton: {
        backgroundColor: "#0e4985",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        shadowColor: "#0251aa",
        shadowOffset: { width: 2, height: 2 },
        elevation: 6,
    },
    applyButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});