'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const myColor: MantineColorsTuple = [
  '#e4f7ff',
  '#d1e9fe',
  '#a4d0f6',
  '#74b6ef',
  '#4da0e9',
  '#3392e6',
  '#228be6',
  '#1078cd',
  '#006bb9',
  '#005ca4'
];

export const theme = createTheme({
  colors: {
    myColor,
  },
});
