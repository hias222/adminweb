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

import Name from './details/Name';
import Club from './details/Club';
import Points from './details/Points'
import Place from './details/Place'
import AdditionalText from './details/AdditionalText'
import StyleText from './details/StyleText'
import Details from './details/Details'
// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  name: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
    top: 390,
  },
  club: {
    textAlign: 'center',
    top: 390
  },
  textbeforestyle: {
    textAlign: 'center',
    top: 390
  },
  textstyle: {
    textAlign: 'center',
    top: 390
  },
  points: {
    textAlign: 'center',
    top: 390
  },
  textbeforeplace: {
    textAlign: 'center',
    top: 390
  },
  place: {
    textAlign: 'center',
    top: 390
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
              <Name>{swimmer.firstname + ' ' + swimmer.lastname}</Name>
            </View>
            <View style={styles.club}>
              <Club>{swimmer.clubname}</Club>
            </View>
            <View style={styles.textbeforestyle}>
              <AdditionalText>errichte im</AdditionalText>
            </View>
            <View style={styles.textstyle}>
              <StyleText>{swimmer.title}</StyleText>
            </View>
            <View style={styles.points}>
              <Points>{swimmer.combinedpoints}</Points>
            </View>
            <View style={styles.textbeforeplace}>
              <AdditionalText>den</AdditionalText>
            </View>
            <View style={styles.place}>
              <Place>{swimmer.place}</Place>
            </View>
            <Details>{swimmer.data}</Details>
          </Page>
        ))}
      </Document>
    </PDFViewer >
  );
}
export default CertsDocument;