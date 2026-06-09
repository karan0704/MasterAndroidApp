export function getCurrentDateTime() {
  return new Date();
}

export function formatClockSnapshot(date: Date) {
  return {
    dateLabel: new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date),
    timeLabel: new Intl.DateTimeFormat(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    }).format(date),
  };
}
