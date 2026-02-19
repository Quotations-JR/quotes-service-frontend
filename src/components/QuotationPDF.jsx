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

  // --- ENCABEZADO CORREGIDO ---
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  infoSection: { width: '65%' },
  logoSection: { width: '35%', alignItems: 'flex-end' },

  rowInfo: { flexDirection: 'row', marginBottom: 4 },
  label: { fontWeight: 'bold', width: 65, fontSize: 10 },
  value: { flex: 1, fontSize: 10 },
  noLabel: { fontWeight: 'bold', width: 65, fontSize: 10, color: 'red' },
  noValue: { flex: 1, fontSize: 10, color: 'red', fontWeight: 'bold' },

  // --- TABLA REESTRUCTURADA ---
  table: {
    marginTop: 10,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ee6c31',
    borderLeftWidth: 1,
    borderLeftColor: '#ee6c31',
    borderRightWidth: 1,
    borderRightColor: '#ee6c31',
    minHeight: 22,
    wrap: false,
    alignItems: 'stretch' // Importante para que los bordes internos lleguen hasta abajo
  },
  tableHeader: {
    backgroundColor: '#ff4d00',
    color: 'white',
    fontWeight: 'bold',
    height: 25,
    borderTopWidth: 1,
    borderTopColor: '#ee6c31',
  },

  // ANCHOS DE COLUMNA DEFINIDOS (Para evitar solapamiento)
  colCant: {
    width: '15%',
    borderRightWidth: 1,
    borderRightColor: '#ee6c31',
    justifyContent: 'center',
    textAlign: 'center'
  },
  colDesc: {
    width: '55%',
    borderRightWidth: 1,
    borderRightColor: '#ee6c31',
    paddingLeft: 5,
    justifyContent: 'center'
  },
  colUni: {
    width: '15%',
    borderRightWidth: 1,
    borderRightColor: '#ee6c31',
    textAlign: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#ff4d00',
    width: '15%',
    padding: 5,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ee6c31',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  totalValueBox: {
    width: '15%',
    padding: 5,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ee6c31',
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
  const { client, items, total, id, createdAt, elaboratedBy } = quotation;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <View style={styles.infoSection}>
            <View style={styles.rowInfo}>
              <Text style={styles.noLabel}>No.</Text>
              <Text style={styles.noValue}>{formatQuotationId(id)}</Text>
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
          </View>

          <View style={styles.logoSection}>
            <Image src={logo} style={{ width: 120 }} />
          </View>
        </View>

        {/* Tabla Corregida */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <View style={styles.colCant}><Text>Cantidad</Text></View>
            <View style={styles.colDesc}><Text>Descripción</Text></View>
            <View style={styles.colUni}><Text>P.Unitario</Text></View>
            <View style={styles.colTot}><Text>P.Total</Text></View>
          </View>

          {items.map((item, i) => (
            <View style={styles.tableRow} key={i} wrap={false}>
              <View style={styles.colCant}><Text>{item.quantity}</Text></View>
              <View style={styles.colDesc}>
                <Text>{item.description}</Text>
                {item.discountPercent > 0 && (
                  <Text style={{ fontSize: 7, color: '#ea580c', marginTop: 2 }}>
                    Descuento aplicado: {item.discountPercent}%
                  </Text>
                )}
              </View>
              <View style={styles.colUni}><Text>{formatCurrency(item.unitPrice)}</Text></View>
              <View style={styles.colTot}><Text>{formatCurrency(item.total)}</Text></View>
            </View>
          ))}
        </View>

        {/* Cierre y Totales */}
        <View wrap={false} style={{ width: '100%', marginTop: 1 }}>
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

        {/* Footer */}
        <View style={styles.footerFixed} fixed>
          <Text style={{ borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8, marginBottom: 4 }}>
            Avenida Hincapié 3-49 zona 13 | Tel. 2234-7254
          </Text>
          <Text render={({ pageNumber, totalPages }) => `Página: ${pageNumber} / ${totalPages}`} />
        </View>

      </Page>
    </Document>
  );
};