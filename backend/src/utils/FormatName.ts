export const formatName = (str: string) => {
  let correctedString: string =
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (
      correctedString.charAt(i) === " " &&
      correctedString.charAt(i + 1) !== " "
    ) {
      correctedString =
        correctedString.substring(0, i) +
        " " +
        correctedString.charAt(i + 1).toUpperCase() +
        correctedString.substring(i + 2);
    }
  }
  return correctedString;
};

export const capitalizeDescription = (description: string) => {
  for (let i = 0; i <= description.length; i++) {
    if (description.charAt(i) !== " ") {
      description =
        description.charAt(i).toUpperCase() + description.slice(i + 1);
      break;
    }
  }
  return description;
};
