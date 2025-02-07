import moment from "moment";
export default function (date: string | Date, format: string) {
  return moment(date).format(format);
}
