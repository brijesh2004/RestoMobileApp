import { Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import Navbar from './Navbar';
import BreakFask from '../components/BreakFask';
import Lunch from '../components/Lunch';
import Dinner from '../components/Dinner';

const Items = ({ navigation }: any) => {
    const [tag, setTag] = useState<number>(1);

    const renderContent = () => {
        switch (tag) {
            case 1:
                return <BreakFask />;
            case 2:
                return <Lunch />;
            case 3:
                return <Dinner />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.itemsHeading}>
                <Pressable onPress={() => setTag(1)}>
                    <Text style={[styles.items, tag === 1 ? styles.activeTag : null]}>Breakfast</Text>
                </Pressable>
                <Pressable onPress={() => setTag(2)}>
                    <Text style={[styles.items, tag === 2 ? styles.activeTag : null]}>Lunch</Text>
                </Pressable>
                <Pressable onPress={() => setTag(3)}>
                    <Text style={[styles.items, tag === 3 ? styles.activeTag : null]}>Dinner</Text>
                </Pressable>
            </View>
            <FlatList
                data={[{ key: 'content' }]} 
                renderItem={() => renderContent()}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.flatListContainer}
            />

            <Navbar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemsHeading: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    items: {
        padding: 15,
        borderWidth: 2,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeTag: {
        backgroundColor: 'green',
    },
    flatListContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
});

export default Items;
