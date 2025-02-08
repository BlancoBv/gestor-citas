import moment from "moment";
import "moment/dist/locale/es-mx";
export default function (date: string | Date, format: string) {
  return moment(date).locale("es-mx").format(format);
}
