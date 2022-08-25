import { Global } from '@mantine/core';

export const GlobalStyles = () => (
  <Global
    styles={theme => ({
      'html, body, #__next': {
        height: '100%',
      },
      body: {
        backgroundColor: theme.colors.gray[0],
      },
    })}
  />
);
