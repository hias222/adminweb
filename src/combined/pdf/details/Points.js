import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const Points = ({ children }) => <Text style={styles.title}>{'mit ' + children + ' Punkten'}</Text>;

export default Points;