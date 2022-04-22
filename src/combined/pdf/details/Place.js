import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
  },
});

const Place = ({ children }) => <Text style={styles.title}>{children + '. Platz'}</Text>;

export default Place;