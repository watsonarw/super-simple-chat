export const byTimestamp = (messageA, messageB) => {
  return messageA.timestamp - messageB.timestamp;
};
