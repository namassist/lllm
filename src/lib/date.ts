import { format } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(date: any) {
  return format(date, "dd MMM yyyy HH:mm");
}

export function formatDateWithTimezone(date: any) {
  const examDate = new Date(date);
  const formattedDate = format(examDate, "EEEE, dd MMMM yyyy HH.mm", {
    locale: id,
  });

  return formattedDate;
}
