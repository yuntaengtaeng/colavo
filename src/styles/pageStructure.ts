import styled from 'styled-components';

export const BaseWrap = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const BaseContents = styled.div`
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 0 1rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;
