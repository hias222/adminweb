import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
});

const Club = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Club;