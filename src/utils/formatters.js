/**
 * Convierte un ID numérico en un correlativo tipo CO-00001
 */
export const formatQuotationId = (id) => {
  if (!id) return 'CO00000';
  return `CO${String(id).padStart(5, '0')}`;
};

/**
 * Formatea un número como moneda Quetzal (Q 1,250.00)
 */
export const formatCurrency = (amount) => {
  const number = Number(amount) || 0;
  return `Q ${number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formatea fechas para que se vean bien en la interfaz
 */
export const formatDate = (dateString) => {
  if (!dateString) return '---';
  return new Date(dateString).toLocaleDateString('es-GT');
};