interface returnInterface {
  result: { [key: string]: any[] };
  keys: () => string[];
  values: () => { [key: string]: any }[];
}

export default function (
  array: any[] | null,
  property: string
): returnInterface {
  const tempObject: { [key: string]: any[] } = {};

  if (array === null) {
    return { result: {}, keys: () => [], values: () => [] };
  }

  array.forEach((el) => {
    const propValue = el[property];

    if (tempObject[propValue]) {
      tempObject[propValue] = [...tempObject[propValue], el];
    } else {
      tempObject[propValue] = [el];
    }
  });
  return {
    result: tempObject,
    keys: () => Object.keys(tempObject),
    values: () => Object.values(tempObject),
  };
}
