import { Container, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import RepositoryBrowser from "./components/RepositoryBrowser";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <Container maxWidth="md">
          <RepositoryBrowser />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
