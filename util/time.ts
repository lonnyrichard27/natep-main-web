'use client'

export const generateTimeSlots = (interval: number = 60) => {
  const times: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 24 * 60; i += interval) {
    const time = new Date(start.getTime() + i * 60000);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Skip '00:00' from being added to the times array
    if (formattedTime !== '00:00') {
      times.push(formattedTime);
    }
  }

  return times;
};

export const generateTimeSpecificSlot = (interval: number = 60) => {
  const times: string[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 24 * 60; i += interval) {
    const time = new Date(start.getTime() + i * 60000);
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Only add specific times to the array
    if (['10:00', '12:00', '14:00', '16:00'].includes(formattedTime)) {
      times.push(formattedTime);
    }
  }

  return times;
};
