import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';
import ResultDetails from './ResultDetails';
const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    textAlign: 'center'
  },
  normal: {
    fontSize: 12,
    textAlign: 'left',
    paddingTop: 0,
    paddingBottom: 0
  },
  smallColumn: {
    flexDirection: 'column',
    width: 15,
    marginLeft: 25
  },
  leftColumn: {
    flexDirection: 'column',
    width: 30,
    marginLeft: 25
  },
  nameColumn: {
    flexDirection: 'column',
    width: 160,
  },
  clubColumn: {
    flexDirection: 'column',
    width: 180,
  },
  pointColumn: {
    flexDirection: 'column',
    width: 150,
    alignItems: 'flex-end'
  },
  containerinternal: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 15
  },
  containerexternal: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 50
  },
});


const TextProtocoll = ({ children }) => <View >
  <View style={styles.containerexternal}>
    <View style={styles.containerinternal}>
      <View style={styles.smallColumn}>
        <Text style={styles.normal}>{children.place + '. '}</Text>
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.normal}>{children.lastname + ' ' + children.firstname}</Text>
      </View>
      <View style={styles.leftColumn}>
        <Text style={styles.normal}>{children.birthdate}</Text>
      </View>
      <View style={styles.clubColumn}>
        <Text style={styles.normal}>{children.clubname}</Text>
      </View>
      <View style={styles.pointColumn}>
        <Text style={styles.normal}>{children.combinedpoints} Pkt.</Text>
      </View>
    </View>
    <ResultDetails>{children.data}</ResultDetails>
  </View>
</View>


export default TextProtocoll;