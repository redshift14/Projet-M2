import {StyleSheet, Font} from '@react-pdf/renderer';

Font.register({
  family: 'Roboto', fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/fonts/roboto/Roboto-Thin.woff",
      fontWeight: 'thin'
    },
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/fonts/roboto/Roboto-Bold.woff",
      fontWeight: 'bold'
    },
    {
      src: "https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/fonts/roboto/Roboto-Regular.woff",
      fontWeight: 'regular'
    },
  ]
 })

const styles = StyleSheet.create({
page: {
  flexDirection: 'column',
  backgroundColor: 'white',
  padding: 30
},
heading: {
  color: 'black',
  textAlign: 'center',
  fontSize: 16,
  fontFamily: 'Roboto',
  fontWeight: 'regular'
},
viewer: {
  width: '100%',
  height: '100%',
  border: 'none'
},
docTitle: {
  color: 'black',
  textAlign: 'center',
  marginTop: 15,
  fontSize: 24,
  marginBottom: 25
},
sectionTitle: {
  marginTop: 15,
  color:'black',
  fontSize: 14,
  textAlign: 'left',
  fontFamily: 'Roboto',
  fontWeight: 'bold'
},
dataLine: {
  display: 'flex',
  fontSize: 12,
  flexDirection: 'row'
},
defaultText: {
  textAlign: 'left',
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  marginTop: 10,
},
inputText: {
  fontFamily: 'Roboto',
  fontWeight: 'regular',
  marginTop: 10,
  textAlign: 'left',
  marginLeft: 4
},
mutliViewsSection: {
  display: 'flex',
  flexDirection: 'row'
},
mutliViewsSection1: {
  flex: 1
},
mutliViewsSection2: {
  flex:1,
},
tableView: {
  marginTop: 10,
  fontFamily: 'Roboto',
  fontWeight: 'regular',
},
headerCell: {
  fontFamily: 'Roboto',
  fontWeight: 'bold',
  padding: 5,
},
bodyCell: {
  fontFamily: 'Roboto',
  fontWeight: 'this',
  padding: 5
},
certID: {
  marginTop: 10,
  fontFamily: 'Roboto',
  fontWeight: 'regular',
  fontSize: 12,
},

});

export default styles;
