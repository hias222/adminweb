import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const AdditionalText = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default AdditionalText;