import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
});

const StyleText = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default StyleText;