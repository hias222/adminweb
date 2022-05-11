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
  },
  smallColumn: {
    flexDirection: 'column',
    width: 15,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 30,
  },
  nameColumn: {
    flexDirection: 'column',
    width: 160,
  },
  clubColumn: {
    flexDirection: 'column',
    width: 200,
  },
  pointColumn: {
    flexDirection: 'column',
    width: 50,
    alignItems: 'flex-end'
  },
  containerinternal: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 15
  },
  containerexternal: {
    flex: 0,
    flexDirection: 'column',
    marginBottom: 44,
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