import { Alert, List } from "@mui/material";
import { Repository } from "models/Repository";
import RepositoryListItem from "components/RepositoryListItem";

interface Props {
  displayedRepositories: Repository[];
  favoriteRepositoryIds: number[];
  onFavorite: (id: number) => void;
  prefix: string;
}

export default function RepositoryList({
  displayedRepositories,
  favoriteRepositoryIds,
  onFavorite,
  prefix
}: Props) {
  return (
    <List>
      {displayedRepositories.length ? (
        displayedRepositories.map((repository) => (
          <RepositoryListItem
            repository={repository}
            isFavorite={favoriteRepositoryIds.includes(repository.id)}
            onFavorite={onFavorite}
            key={`${prefix}-${repository.id}`}
          />
        ))
      ) : (
        <Alert severity="info" variant="outlined" sx={{ opacity: 0.8 }}>
          There's nothing to see here yet!
        </Alert>
      )}
    </List>
  );
}
