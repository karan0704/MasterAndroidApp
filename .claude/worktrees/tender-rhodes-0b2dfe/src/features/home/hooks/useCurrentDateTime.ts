import { useEffect, useState } from 'react';

import { formatClockSnapshot, getCurrentDateTime } from '../services/homeClockService';

export function useCurrentDateTime() {
  const [snapshot, setSnapshot] = useState(() =>
    formatClockSnapshot(getCurrentDateTime()),
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setSnapshot(formatClockSnapshot(getCurrentDateTime()));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return snapshot;
}
