export const errorService = (value) => {
  if (typeof value === "string") return value;
  return `fielnd_name: ${value[0].field_name} , error ${value[0].error}`;
};
