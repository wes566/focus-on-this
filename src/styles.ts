import styled from "styled-components";

export const PrimaryBackgroundColor: string = "#2c2828";
export const PrimaryForegroundColor: string = "#fafafa";
export const AccentColor: string = "#2c4ba9";
export const SecondaryAccentColor: string = "#6077be";

export const DarkDiv = styled.div`
  background-color: PrimaryBackgroundColor;
  color: PrimaryForegroundColor;
`;

export const AccentText = styled.div`
  color: AccentColor;
`;

export const SecondaryAccentText = styled.div`
  color: SecondaryAccentColor;
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
