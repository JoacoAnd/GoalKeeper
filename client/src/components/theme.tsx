import { createTheme } from "@mui/material";

type ITheme = {
    palette: {
        primary: {
            main: string;
        },
        secondary: {
            main: string;
        },
    }
};

const theme: ITheme = createTheme({
    palette: {
        primary: {
          main: "#e2ac56",
        },
        secondary: {
          main: "#25a519",
        },
      },
});

export default theme;