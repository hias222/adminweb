import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    paddingTop: 10
  },
});

const HeaderProtocoll = ({ children }) => <Text style={styles.title}>{children}</Text>;

export default HeaderProtocoll;