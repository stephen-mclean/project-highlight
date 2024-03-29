import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Muli:400,500,600");
    @import url("https://fonts.googleapis.com/css?family=Cormorant+Infant:400,500,600");

    html,
    body,
    #root {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: "Muli", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
        margin-block-start: 0;
        margin-block-end: 0;
    }

    .default-toast {
        font-family: "Muli", sans-serif !important;
        color: ${props =>
          `${props.theme.colors.foreground.default} !important`};

        button {
            color: ${props =>
              `${props.theme.colors.foreground.default} !important`};
        }
        align-items: center; 
    }

    .default-toast-progress {
        background: ${props =>
          `${props.theme.colors.background.tertiary} !important`};
    }

    .success-toast {
        font-family: "Muli", sans-serif !important;
        color: ${props => `${props.theme.colors.primary.verylight} !important`};
        background: ${props =>
          `${props.theme.colors.primary.default} !important`};
        align-items: center; 

        button {
            color: ${props =>
              `${props.theme.colors.primary.verylight} !important`};
        }
    }

    .success-toast-progress {
        background: ${props =>
          `${props.theme.colors.primary.verylight} !important`};
    }

    .danger-toast {
        font-family: "Muli", sans-serif !important;
        color: ${props => `${props.theme.colors.danger.verylight} !important`};
        background: ${props =>
          `${props.theme.colors.danger.default} !important`};
        align-items: center; 

        button {
            color: ${props =>
              `${props.theme.colors.danger.verylight} !important`};
        }
    }

    .danger-toast-progress {
        background: ${props =>
          `${props.theme.colors.danger.verylight} !important`};
    }

    .ReactCrop__image {
      max-height: none !important; 
    }
`;
