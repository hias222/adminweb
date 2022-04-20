import React from 'react';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import './Sample.css';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  name: {
    fontSize: 32,
    textAlign: 'center',
    top: 250,
  },
  club: {
    position: 'absolute',
    fontSize: 24,
    textAlign: 'center',
    top: 250
  },
  points: {
    fontSize: 24,
    textAlign: 'center',
    top: 300
  },
  place: {
    fontSize: 24,
    textAlign: 'center',
    top: 320
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
function CertsDocument(model) {
  //console.log(model.certData)
  model.certData.map((swimmer, index) => (
    console.log(swimmer)
  ))
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        {model.certData.map((swimmer, index) => (
          <Page size="A4" style={styles.page}>
            <View style={styles.name}>
              <Text>{swimmer.firstname + ' ' + swimmer.lastname} </Text>
            </View>
            <View style={styles.club}>
              <Text>{swimmer.clubname} </Text>
            </View>
            <View style={styles.points}>
              <Text>{'Punkte ' + swimmer.combinedpoints} </Text>
            </View>
            <View style={styles.points}>
              <Text>{swimmer.place + '. Platz'} </Text>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer >
  );
}
export default CertsDocument;