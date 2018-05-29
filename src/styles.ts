import styled from "styled-components";

export const DarkDiv = styled.div`
  background-color: #2c2828;
  color: #fafafa;
`;

export const AccentText = styled.div`
  color: #2c4ba9;
`;

export const SecondaryAccentText = styled.div`
  color: #6077be;
`;

export const PageContainer = styled.div`
  color: ${props => props.theme.colorTextDefault};
  background-color: ${props => props.theme.colorBackground};
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex: 1;
`;
