import { Page, Text, View, Document } from '@react-pdf/renderer';
import styles from './IssueDocumentStyle';
import {Table, TableHeader, TableBody, TableCell, DataTableCell} from '@david.kucsai/react-pdf-table';

const MyDocument = ({
  name, lastName, dob, pod, cardNumber, holderEmail, certTitle, certField, certFaculty, certSpecialty,
  certLevel, certYear, univDem, univInstitut, univDep, univAddress, univTel, univSite, totalMark, evaluationNote,
  rankingNote, otherNotes
}) => (
  <Document title='Certification' author='Certifier' subject='Certification Details' creator='Master-2-Information-Relizane' producer='Master-2-Informatique-Relizane'>

    <Page size="A4" style={styles.page}>

      <View style={styles.heading}>
        <Text>People's Democratic Republic of Algeria</Text>
        <Text>Ministry of Higher Education and Scientific Research</Text>
        <Text>University of Relizane</Text>
      </View>

      <View style={styles.docTitle}>
        <Text>Success Certificate</Text>
      </View>

      <View>

        <View style={styles.mutliViewsSection}>

          <View style={styles.mutliViewsSection1}>
            <Text style={styles.sectionTitle}>1- Certificate Holder:</Text>
            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Name:</Text>
              <Text style={styles.inputText}>{name}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Last Name:</Text>
              <Text style={styles.inputText}>{lastName}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Date of Birth:</Text>
              <Text style={styles.inputText}>{dob}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Place of Birth:</Text>
              <Text style={styles.inputText}>{pod}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Card Number:</Text>
              <Text style={styles.inputText}>{cardNumber}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Email:</Text>
              <Text style={styles.inputText}>{holderEmail}</Text>
            </View>
          </View>

          <View style={styles.mutliViewsSection2}>
            <Text style={styles.sectionTitle}>2- Certificate Information:</Text>
            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Certificate Title:</Text>
              <Text style={styles.inputText}>{certTitle}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Field:</Text>
              <Text style={styles.inputText}>{certField}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Faculty:</Text>
              <Text style={styles.inputText}>{certFaculty}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Specialty:</Text>
              <Text style={styles.inputText}>{certSpecialty}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Level:</Text>
              <Text style={styles.inputText}>{certLevel}</Text>
            </View>

            <View style={styles.dataLine}>
              <Text style={styles.defaultText}>Year:</Text>
              <Text style={styles.inputText}>{certYear}</Text>
            </View>
          </View>

        </View>



        <View>
          <Text style={styles.sectionTitle}>3- The authority responsible for issuing the certificate:</Text>
          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Denomination:</Text>
            <Text style={styles.inputText}>{univDem}</Text>
          </View>

          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Institut:</Text>
            <Text style={styles.inputText}>{univInstitut}</Text>
          </View>

          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Departement:</Text>
            <Text style={styles.inputText}>{univDep}</Text>
          </View>

          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Address:</Text>
            <Text style={styles.inputText}>{univAddress}</Text>
          </View>

          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Telephone:</Text>
            <Text style={styles.inputText}>{univTel}</Text>
          </View>

          <View style={styles.dataLine}>
            <Text style={styles.defaultText}>Website:</Text>
            <Text style={styles.inputText}>{univSite}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>4- Results:</Text>
        </View>
        <View style={styles.tableView}>
          <Table
                data={[
                    {totalResult: totalMark, evaluation: evaluationNote, ranking: rankingNote, "notes": otherNotes}
                ]}
            >
                <TableHeader textAlign={"center"} >
                    <TableCell weighting={1.4} style={styles.headerCell}>
                        The Total Mark Obtained
                    </TableCell>
                    <TableCell weighting={0.6} style={styles.headerCell}>
                        Evaluation
                    </TableCell>
                    <TableCell weighting={0.6} style={styles.headerCell}>
                        Ranking
                    </TableCell>
                    <TableCell weighting={1.4} style={styles.headerCell}>
                        Other Notes
                    </TableCell>
                </TableHeader>
                <TableBody textAlign={"center"}>
                    <DataTableCell style={styles.bodyCell} weighting={1.4} getContent={(r) => r.totalResult}/>
                    <DataTableCell style={styles.bodyCell} weighting={0.6} getContent={(r) => r.evaluation}/>
                    <DataTableCell style={styles.bodyCell} weighting={0.6} getContent={(r) => r.ranking}/>
                    <DataTableCell style={styles.bodyCell} weighting={1.4} getContent={(r) => r.notes}/>
                </TableBody>
            </Table>
        </View>

        <View style={styles.dataLine}>
          <Text style={styles.certID}>Certificate ID:</Text>
        </View>

      </View>

    </Page>

  </Document>
);

export default MyDocument;
