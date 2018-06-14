import styled from "styled-components";

export enum ThemeColors {
  PrimaryBackground = "#000000",
  SecondaryBackground = "#333333",
  PrimaryForeground = "#fafafa",
  Accent = "#2c4ba9",
  SecondaryAccent = "#6077be"
}

export const DarkDiv = styled.div`
  background-color: ${ThemeColors.PrimaryBackground};
  color: ${ThemeColors.PrimaryForeground};
`;

export const AccentText = styled.div`
  color: ${ThemeColors.Accent};
`;

export const SecondaryAccentText = styled.div`
  color: ${ThemeColors.SecondaryAccent};
`;

export const PageContainer = styled.div`
  color: ${ThemeColors.PrimaryForeground};
  background-color: ${ThemeColors.PrimaryBackground};
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

export const AltPageContainer = styled.div`
  color: ${ThemeColors.PrimaryForeground};
  background-color: ${ThemeColors.SecondaryBackground};
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  flex: 1;
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  /* position: static; */
`;

export const TextContainer = styled.div`
  max-width: 40em;
  padding: 2em;
`;
