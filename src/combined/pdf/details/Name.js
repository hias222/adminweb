import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 5,
  },
});

const Name = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default Name;