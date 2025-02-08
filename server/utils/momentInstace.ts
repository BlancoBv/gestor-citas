import moment from "moment";
export default function (date: string | Date) {
  return moment(date).locale("es-MX");
}
