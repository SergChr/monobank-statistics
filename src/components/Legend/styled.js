import styled from 'styled-components';

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2% 0;
  justify-content: center;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  width: 47%;
  margin: 1%;
`;

export const Circle = styled.div`
  min-height: 10px;
  min-width: 10px;
  background: ${p => p.color};
  border-radius: 20px;
  margin: 3px;
`;

export const Text = styled.div`
`;
