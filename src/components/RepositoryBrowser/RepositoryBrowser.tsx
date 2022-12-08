import { useEffect, useState } from "react";
import { RepositoriesResponse, Repository } from "models/Repository";
import { Alert, Box, Grid, Tab, Tabs } from "@mui/material";
import useLocalStorage from "hooks/useLocalStorage";
import getTimeZoneAdjustedStartDate from "utils/getTimeZoneAdjustedStartDate";
import RepositoryList from "components/RepositoryList";
import TabPanel from "components/TabPanel";
import RepositoryLanguageFilter from "components/RepositoryLanguageFilter";

export default function RepositoryBrowser() {
  const SEARCH_TIMESPAN_DAYS = 7;

  const [isLoading, setIsLoading] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [favoriteRepositoryIds, setFavoriteRepositoryIds] = useLocalStorage<
    number[]
  >("favorite-repositories", []);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  const [favoriteLanguages, setFavoriteLanguages] = useLocalStorage<string[]>(
    "favorite-languages",
    []
  );
  const filteredRepositories = favoriteLanguages.length
    ? repositories.filter((repo) =>
        favoriteLanguages.includes(repo.language || "")
      )
    : repositories;
  const favoritedAndFilteredRepositories = filteredRepositories.filter((repo) =>
    favoriteRepositoryIds.includes(repo.id)
  );

  function onAddRepositoryToFavorites(id: number) {
    const index = favoriteRepositoryIds.indexOf(id);
    if (index > -1) {
      setFavoriteRepositoryIds([
        ...favoriteRepositoryIds.slice(0, index),
        ...favoriteRepositoryIds.slice(index + 1)
      ]);
    } else {
      setFavoriteRepositoryIds([...favoriteRepositoryIds, id]);
    }
  }

  useEffect(() => {
    function extractRepositoryLanguages(repositories: Repository[]) {
      const languages: string[] = [];

      repositories.forEach((repo) => {
        if (repo.language && !languages.includes(repo.language)) {
          languages.push(repo.language);
        }
      });

      return languages;
    }

    async function fetchRepositories() {
      const startDateString = getTimeZoneAdjustedStartDate(
        new Date(),
        SEARCH_TIMESPAN_DAYS
      );

      try {
        const repositories: RepositoriesResponse = await fetch(
          `https://api.github.com/search/repositories?q=created:%3E${startDateString}&sort=stars&order=desc`
        ).then((response) => response.json());

        setRepositories(repositories.items);
        setAllLanguages(extractRepositoryLanguages(repositories.items));
        setIsLoading(false);
      } catch {
        setError(true);
        setIsLoading(false);
      }
    }

    fetchRepositories();
  }, []);

  return (
    <>
      <Grid container mt={5}>
        <Grid item sm={4} order={{ xs: 3, sm: 1 }}>
          <Tabs
            value={currentTab}
            onChange={(_, value) => setCurrentTab(value)}
          >
            <Tab value="all" label="All repositories" />
            <Tab value="favorites" label="Favorites" />
          </Tabs>
        </Grid>
        <Grid item xs={0} sm={5} order={2} />
        <Grid
          item
          xs={12}
          sm={3}
          display="flex"
          alignItems="flex-end"
          order={{ xs: 1, sm: 3 }}
        >
          <RepositoryLanguageFilter
            favoriteLanguages={favoriteLanguages}
            setFavoriteLanguages={setFavoriteLanguages}
            allLanguages={allLanguages}
          />
        </Grid>
      </Grid>
      <Box my={4}>
        {error && (
          <Alert severity="error">
            An error happened while fetching repositories.
          </Alert>
        )}
        {!isLoading && (
          <>
            <TabPanel currentValue={currentTab} value="all">
              <RepositoryList
                displayedRepositories={filteredRepositories}
                favoriteRepositoryIds={favoriteRepositoryIds}
                onFavorite={onAddRepositoryToFavorites}
                prefix="all"
              />
            </TabPanel>
            <TabPanel currentValue={currentTab} value="favorites">
              <RepositoryList
                displayedRepositories={favoritedAndFilteredRepositories}
                favoriteRepositoryIds={favoriteRepositoryIds}
                onFavorite={onAddRepositoryToFavorites}
                prefix="favorites"
              />
            </TabPanel>
          </>
        )}
      </Box>
    </>
  );
}
