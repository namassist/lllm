import { format } from "date-fns";

export function formatDate(date: any) {
  return format(date, "dd MMM yyyy HH:mm");
}
