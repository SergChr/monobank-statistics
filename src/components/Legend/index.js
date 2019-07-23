import React from 'react';

import { Legend, Item, Circle, Text } from './styled';

const MAX_STRING_LENGTH = 35;

export default ({ data }) => (
  <Legend>
    {data.map(item => (
      <Item key={item.label}>
        <Circle color={item.color} />
        <Text>{truncate(item.label)} ({item.amount})</Text>
      </Item>
    ))}
  </Legend>
);

function truncate (string) {
  if (string.length < MAX_STRING_LENGTH) {
    return string;
  }

  return `${string.substring(0, MAX_STRING_LENGTH)}...`;
}
