import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/logo.png';
import { formatQuotationId, formatCurrency, formatDate } from '../utils/formatters';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 75,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: 'Helvetica'
  },

  // --- ENCABEZADO MÁS GRANDE Y ESPACIADO ---
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoSection: {
    width: '70%',
  },
  logoSection: {
    width: '30%',
    alignItems: 'flex-end'
  },

  rowInfo: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center'
  },

  // Etiquetas más anchas y legibles
  label: {
    fontWeight: 'bold',
    width: 80,
    fontSize: 11,
  },
  value: {
    flex: 1,
    fontSize: 11,
  },

  // Estilo destacado para el número de cotización
  noLabel: {
    fontWeight: 'bold',
    width: 80,
    fontSize: 14,
    color: 'red'
  },
  noValue: {
    flex: 1,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold'
  },

  // Estilo para la paginación dentro del header
  pageText: {
    fontSize: 10,
    color: '#444',
    fontWeight: 'bold'
  },

  // --- TABLA REESTRUCTURADA ---
  table: {
    marginTop: 10,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
    borderLeftWidth: 1,
    borderLeftColor: 'red',
    borderRightWidth: 1,
    borderRightColor: 'red',
    minHeight: 22,
    wrap: false,
    alignItems: 'stretch'
  },
  tableHeader: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    height: 25,
    borderTopWidth: 1,
    borderTopColor: 'red',
  },

  // --- ANCHOS DE COLUMNA ---
  colCant: {
    width: '10%',
    borderRightWidth: 1,
    borderRightColor: 'red',
    justifyContent: 'center',
    textAlign: 'center'
  },
  colDesc: {
    width: '45%',
    borderRightWidth: 1,
    borderRightColor: 'red',
    paddingLeft: 5,
    justifyContent: 'center'
  },
  colDescrip: { // Estilo para el texto de descripción
    fontSize: 10,
  },
  colUni: {
    width: '15%',
    borderRightWidth: 1,
    borderRightColor: 'red',
    textAlign: 'center',
    justifyContent: 'center'
  },
  colDesc_Porcentaje: {
    width: '15%',
    borderRightWidth: 1,
    borderRightColor: 'red',
    textAlign: 'center',
    justifyContent: 'center',
    //color: '#ea580c',
    fontWeight: 'bold'
  },
  colTot: {
    width: '15%',
    textAlign: 'center',
    justifyContent: 'center'
  },

  // --- TOTAL ---
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },
  totalLabelBox: {
    backgroundColor: 'red',
    width: '15%',
    padding: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  totalValueBox: {
    width: '15%',
    padding: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  // --- FOOTER FIJO ---
  footerFixed: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  }
});

export const QuotationDocument = ({ quotation }) => {
  const { client, items, total, correlativo, createdAt, elaboratedBy } = quotation;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* --- ENCABEZADO QUE SE REPITE --- */}
        <View style={styles.headerContainer} fixed>
          <View style={styles.infoSection}>
            {/* CORRELATIVO DESTACADO */}
            <View style={[styles.rowInfo, { marginBottom: 10 }]}>
              <Text style={styles.noLabel}>No.</Text>
              <Text style={styles.noValue}>{formatQuotationId(correlativo)}</Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.value}>{client?.name}</Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.value}>{formatDate(createdAt)}</Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>Dirección:</Text>
              <Text style={styles.value}>{client?.address}</Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>NIT:</Text>
              <Text style={styles.value}>{client?.taxId}</Text>
            </View>

            {/* PAGINACIÓN INTEGRADA */}
            <View style={[styles.rowInfo, { marginTop: 4 }]}>
              <Text style={[styles.label, styles.pageText]}>Página:</Text>
              <Text
                style={[styles.value, styles.pageText]}
                render={({ pageNumber, totalPages }) => `${pageNumber} de ${totalPages}`}
              />
            </View>
          </View>

          {/* LOGO MÁS GRANDE */}
          <View style={styles.logoSection}>
            <Image src={logo} style={{ width: 140 }} />
          </View>
        </View>

        {/* --- TABLA --- */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <View style={styles.colCant}><Text>Cant.</Text></View>
            <View style={styles.colDesc}><Text>Descripción</Text></View>
            <View style={styles.colUni}><Text>P. Unitario</Text></View>
            <View style={styles.colDesc_Porcentaje}><Text>Desc. %</Text></View>
            <View style={styles.colTot}><Text>P. Total</Text></View>
          </View>

          {items.map((item, i) => (
            <View style={styles.tableRow} key={i} wrap={false}>
              <View style={styles.colCant}>
                <Text>{item.quantity}</Text>
              </View>

              <View style={styles.colDesc}>
                <Text style={styles.colDescrip}>{item.description}</Text>
              </View>

              <View style={styles.colUni}>
                <Text>{formatCurrency(item.unitPrice)}</Text>
              </View>

              <View style={styles.colDesc_Porcentaje}>
                <Text>{item.discountPercent > 0 ? `${item.discountPercent}%` : '-'}</Text>
              </View>

              <View style={styles.colTot}>
                <Text>{formatCurrency(item.total)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* --- CIERRE Y TOTALES --- */}
        <View wrap={false} style={{ width: '100%', marginTop: 10 }}>
          <View style={styles.totalContainer}>
            <View style={styles.totalLabelBox}><Text>TOTAL.</Text></View>
            <View style={styles.totalValueBox}>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Q</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{Number(total).toFixed(2)}</Text>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <View style={styles.rowInfo}><Text style={styles.label}>Garantía:</Text><Text style={styles.value}>{quotation.warranty}</Text></View>
            <View style={styles.rowInfo}><Text style={styles.label}>Entrega:</Text><Text style={styles.value}>{quotation.deliveryTime}</Text></View>
            <View style={styles.rowInfo}><Text style={styles.label}>Forma pago:</Text><Text style={styles.value}>{quotation.paymentMethod}</Text></View>
            <View style={styles.rowInfo}><Text style={styles.label}>Elaborado:</Text><Text style={styles.value}>{elaboratedBy}</Text></View>
            <Text style={{ marginTop: 10, fontSize: 9, lineHeight: 1.4 }}>{quotation.observations}</Text>
          </View>
        </View>

        {/* --- FOOTER (Sin la numeración) --- */}
        <View style={styles.footerFixed} fixed>
          <Text style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 }}>
            Avenida Hincapié 3-49 zona 13 | Tel. 2234-7254
          </Text>
        </View>

      </Page>
    </Document>
  );
};