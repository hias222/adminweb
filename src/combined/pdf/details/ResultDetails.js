import React from 'react';

import {
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
  },
  detail: {
    fontSize: 10,
    textAlign: 'left'
  },
  containerinternal: {
    flex: 1,
    flexDirection: 'row',
  },
  containerexternal: {
    flex: 1,
    flexDirection: 'row',
  },
  nameColumn: {
    flexDirection: 'row',
    width: 140,
  },
});

function getText(swimmerdata) {
  var dataText = []
  swimmerdata.map((detail, index) => {
    var newText1 = detail.distance + 'm ' + detail.swimstyle + ' ' + detail.points + ' Pkt ' + detail.swimtime + ' '
    dataText.push(newText1)
  })
  return dataText
}

const ResultDetails = ({ children }) =>
  <View style={styles.containerexternal}>
    {getText(children).map((text, index) => {
      return <View style={styles.nameColumn}>
        <Text key={index} style={styles.detail}>
          {text}
        </Text>
      </View>
    })}
  </View >

export default ResultDetails;