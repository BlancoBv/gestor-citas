export const noEmptyOrBlankSpaces = {
  callback: (value: string | null) => {
    if (value === null) {
      return true;
    }
    return value.trim().length > 0;
  },
  message: (field: string) =>
    `${field} no debe estar vacío o con espacios en blanco`,
};
