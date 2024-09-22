/**
 * Converts an ISO 8601 formatted date string to a more human-readable format.
 * @param isoDateString The ISO 8601 formatted date string.
 * @returns A formatted date string in the format "MMM DD, YYYY - hh:mmAM".
 */
export function convertIsoToDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day
  const monthIndex = date.getMonth(); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits for minutes
  const ampm = hours >= 12? 'PM' : 'AM';
  const hour = hours % 12 || 12; // Convert to 12-hour clock

  return `${monthNames[monthIndex]} ${day}, ${year} - ${hour}:${minutes}${ampm}`;
}
