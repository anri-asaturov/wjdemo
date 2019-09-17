import React from 'react';
import styled from 'styled-components';
import CoverSpinner from './CoverSpinner';

const Container = styled.div`
  position: relative;
  width: 2rem;
  height: 2.4rem;
  margin: auto;
`;

export default function InlineSpinner() {
  return (
    <Container>
      <CoverSpinner />
    </Container>
  );
}
