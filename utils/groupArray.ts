export default function (array: any[] | null, property: string) {
  const tempObject: { [key: string]: any[] } = {};

  if (array === null) {
    return {};
  }

  array.forEach((el) => {
    const propValue = el[property];

    if (tempObject[propValue]) {
      tempObject[propValue] = [...tempObject[propValue], el];
    } else {
      tempObject[propValue] = [el];
    }
  });

  console.log(tempObject);
  return tempObject;
}
