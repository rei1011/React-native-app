import React, {Component} from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  threads: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  image: {
    width: 50,
    height: 50
  }
});

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      threads: []
    }
  }

  componentDidMount() {
    fetch("https://www.reddit.com/r/newsokur/hot.json")
    .then(response => response.json())
    .then(responseJson => {
      let threads = responseJson.data.children;
      threads = threads.map(thread => {
        thread.key = thread.data.url;
        return thread;
      })
      this.setState({threads})
    })
    .catch(error => {
      console.error(error);
    })
  }

  render() {
    const { threads } = this.state;

    return ( 
      <View style={styles.container}>
        <FlatList data={threads} renderItem={({item}) => {
          return (
            <View style={styles.threads}>
              <Image style={styles.image} source={{uri: item.data.thumbnail}} />
              <Text>{item.data.title}</Text>
            </View>
          )
        }}/>
      </View>
    )
  }
}