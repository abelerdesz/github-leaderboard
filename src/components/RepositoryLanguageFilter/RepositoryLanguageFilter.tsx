import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@mui/material";

interface Props {
  allLanguages: string[];
  favoriteLanguages: string[];
  setFavoriteLanguages: (names: string[]) => void;
}

export default function RepositoryLanguageFilter({
  allLanguages,
  favoriteLanguages,
  setFavoriteLanguages
}: Props) {
  function onSelection(name: string | string[]) {
    if (Array.isArray(name)) {
      setFavoriteLanguages(name);
    } else {
      setFavoriteLanguages([name]);
    }
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label" size="small" color="secondary">
        Languages
      </InputLabel>
      <Select
        multiple
        id="language-select"
        labelId="language-select-label"
        value={favoriteLanguages}
        onChange={(event) => onSelection(event.target.value)}
        input={
          <OutlinedInput
            label="Languages"
            size="small"
            inputProps={{ "data-testid": "language-select" }}
          />
        }
        renderValue={(selected) => (
          <Typography variant="body2" pt={0.5}>
            {selected.join(", ")}
          </Typography>
        )}
        color="secondary"
        MenuProps={{
          PaperProps: {
            elevation: 12
          }
        }}
      >
        {allLanguages.map((language) => (
          <MenuItem key={language} value={language}>
            <Checkbox checked={favoriteLanguages.includes(language)} />
            <ListItemText primary={language} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
