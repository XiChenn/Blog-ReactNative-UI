import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

import BlogContext from '../context/BlogContext';
//import { FlatList } from 'react-native-gesture-handler';

const IndexScreen = () => {
    const { data, addBlogPost } = useContext(BlogContext);
    return (
        <View>
            <Text>Index Screen</Text>
            <Button title="Add post" onPress={addBlogPost}/>
            <FlatList
                data={data}
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