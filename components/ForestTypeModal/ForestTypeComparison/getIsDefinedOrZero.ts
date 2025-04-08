function getIsDefinedOrZero(
  value: null | number | string | undefined,
): boolean {
  return value === 0 || !!value;
}

export default getIsDefinedOrZero;
