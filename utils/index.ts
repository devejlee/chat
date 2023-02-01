export const formatTimestamp = (_seconds: number): string => {
  const date = new Date(_seconds * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
