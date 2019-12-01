import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import { Context as BlogContext } from '../context/BlogContext';
//import { FlatList } from 'react-native-gesture-handler';

const IndexScreen = () => {
    const { state, addBlogPost } = useContext(BlogContext);
    return (
        <View>
            <Text>Index Screen</Text>
            <Button title="Add post" onPress={addBlogPost}/>
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return <Text>{item.title}</Text>
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default IndexScreen;