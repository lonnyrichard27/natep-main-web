'use client'
export const generateTimeSlots = (interval: number = 60) => {
  const times: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 24 * 60; i += interval) {
    const time = new Date(start.getTime() + i * 60000);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    times.push(formattedTime);
  }

  return times;
};

