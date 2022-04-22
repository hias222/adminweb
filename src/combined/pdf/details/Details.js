import React from 'react';

import {
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    marginBottom: 10,
  },
  detail: {
    fontSize: 10,
    textAlign: 'center',
    top: 280
  },
  row: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
});

const Details = ({ children }) =>
  <View style={styles.detail}>
    <View style={styles.container}>
      {children.map((detail, index) =>
        <View style={styles.row}>
          <View style={styles.title}>
            <Text key={index} style={styles.title}>{detail.distance + 'm ' + detail.swimstyle}</Text>
          </View>
          <View style={styles.title}>
            <Text key={index} style={styles.title}>{detail.points + ' Punkte'}</Text>
          </View>
          <View style={styles.title}>
            <Text key={index} style={styles.title}>{ detail.swimtime}</Text>
          </View>
        </View>
      )}
    </View>
  </View >


export default Details;