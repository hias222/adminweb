import React from 'react';

import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

import './Sample.css';

import TextProtocoll from './details/TextProtokoll';

import HeaderProtocoll from './details/HeaderProtokoll';

var maxLength = 1
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
    padding: 30,
  },
  header: {
    marginTop: 20,
    marginLeft: 10,
    padding: 0,
    textAlign: 'left',
  },
  normal: {
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'left',
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  }
});

function checkSwimmer(swimmer) {
  if (swimmer.data.length > maxLength) {
    maxLength = swimmer.data.length
  }
  if (swimmer.data.length > +maxLength - 1 ) {
    return <TextProtocoll>{swimmer}</TextProtocoll>
  }
};

// Create Document Component
function ResultsDocument(model) {

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document
      author="SG Fürth"
      >
        <Page size="A4" style={styles.page}>
          {/*render a single page*/}
          <View style={styles.header}>
            <HeaderProtocoll>{model.certData[0].title}</HeaderProtocoll>
            <HeaderProtocoll>{model.certData[0].birthdate}</HeaderProtocoll>
          </View>
          <View style={styles.container}>
            {model.certData.map((swimmer, index) => (
              checkSwimmer(swimmer)
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer >
  );
}
export default ResultsDocument;