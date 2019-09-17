import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCircleNotch } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<{ backdrop: boolean; fullPage: boolean }>`
  color: ${p => p.theme.brandColor};
  position: ${p => (p.fullPage ? 'fixed' : 'absolute')};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${p => (p.backdrop ? 'rgba(0, 0, 0, 0.4)' : 'transparent')};
  .icon {
    height: 4rem;
    max-height: 4rem;
    animation: ${rotate} 2s linear infinite;
  }
`;

export default function CoverSpinner({ backdrop = false, fullPage = false }) {
  return (
    <Container backdrop={backdrop} fullPage={fullPage}>
      <FaCircleNotch className="icon" />
    </Container>
  );
}
