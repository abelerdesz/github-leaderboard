import React, { useEffect, useMemo, useState } from "react";
import { RepositoriesResponse, Repository } from "../../models/Repository";
import {
  Alert,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
import RepositoryList from "../RepositoryList";
import getTimeZoneAdjustedStartDate from "../../utils/getDateString";

export default function RepositoryBrowser() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [error, setError] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [favoriteRepoIds, setFavoriteRepoIds] = useLocalStorage<number[]>(
    "favorite-repos",
    []
  );
  const [languages, setLanguages] = useState<string[]>([]);
  const [favoriteLanguages, setFavoriteLanguages] = useLocalStorage<string[]>(
    "favorite-languages",
    []
  );
  const TIMESPAN_DAYS = 7;
  const startDateString = useMemo(
    () => getTimeZoneAdjustedStartDate(new Date(), TIMESPAN_DAYS),
    []
  );
  const displayedRepos = useMemo(
    () =>
      repos.filter(
        (repo) =>
          (currentTab === "all" || favoriteRepoIds.includes(repo.id)) &&
          (favoriteLanguages.length
            ? favoriteLanguages.includes(repo.language || "")
            : true)
      ),
    [repos, currentTab, favoriteRepoIds, favoriteLanguages]
  );

  useEffect(() => {
    async function getRepos() {
      try {
        const repos: RepositoriesResponse = await fetch(
          `https://api.github.com/search/repositories?q=created:%3E${startDateString}&sort=stars&order=desc`
        ).then((resp) => resp.json());

        setRepos(repos.items);
        setLanguages(() => {
          const languages: string[] = [];

          repos.items.forEach((repo) => {
            if (repo.language && !languages.includes(repo.language)) {
              languages.push(repo.language);
            }
          });

          return languages;
        });
      } catch {
        setError(true);
      }
    }

    getRepos();
  }, [startDateString]);

  function onFavorite(id: number) {
    const favoriteIndex = favoriteRepoIds.indexOf(id);
    if (favoriteIndex > -1) {
      setFavoriteRepoIds([
        ...favoriteRepoIds.slice(0, favoriteIndex),
        ...favoriteRepoIds.slice(favoriteIndex + 1)
      ]);
    } else {
      setFavoriteRepoIds([...favoriteRepoIds, id]);
    }
  }

  function setFavoriteLanguage(name: string | string[]) {
    if (Array.isArray(name)) {
      setFavoriteLanguages(name);
    } else {
      setFavoriteLanguages([name]);
    }
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  return (
    <>
      <Grid container mt={5}>
        <Grid item xs={4}>
          <Tabs
            value={currentTab}
            onChange={(_, value) => setCurrentTab(value)}
          >
            <Tab value="all" label="All repositories" />
            <Tab value="favoriteRepoIds" label="Favorites" />
          </Tabs>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel
              id="language-select-label"
              size="small"
              color="secondary"
            >
              Language
            </InputLabel>
            <Select
              color="secondary"
              labelId="language-select-label"
              id="language-select"
              multiple
              value={favoriteLanguages}
              onChange={(event) => setFavoriteLanguage(event.target.value)}
              input={<OutlinedInput label="Language" size="small" />}
              renderValue={(selected) => (
                <Typography variant="body2" pt={0.5}>
                  {selected.join(", ")}
                </Typography>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                    // width: "100%"
                  }
                }
              }}
            >
              {languages.map((language) => (
                <MenuItem key={language} value={language}>
                  <Checkbox checked={favoriteLanguages.includes(language)} />
                  <ListItemText primary={language} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={3}>
        {error && (
          <Alert severity="error">
            There was an error while fetching repositories.
          </Alert>
        )}
        <RepositoryList
          displayedRepos={displayedRepos}
          favoriteRepoIds={favoriteRepoIds}
          onFavorite={onFavorite}
        />
      </Box>
    </>
  );
}
