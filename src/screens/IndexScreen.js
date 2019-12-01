import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';


const IndexScreen = () => {
    const { state, addBlogPost } = useContext(BlogContext);
    return (
        <View>
            <Button title="Add post" onPress={addBlogPost}/>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Feather style={styles.icon} name="trash"/>
                        </View>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 18
    },
});

export default IndexScreen;