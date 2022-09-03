jest.mock('react-native', () => {
  return {
    Dimensions: {
      get: () => ({
        width: 600,
      }),
    },
  };
});
