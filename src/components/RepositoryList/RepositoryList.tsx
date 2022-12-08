import { List } from "@mui/material";
import { Repository } from "../../models/Repository";
import RepositoryListItem from "../RepositoryListItem";

interface Props {
  displayedRepositories: Repository[];
  favoriteRepositoryIds: number[];
  onFavorite: (id: number) => void;
}

export default function RepositoryList({
  displayedRepositories,
  favoriteRepositoryIds,
  onFavorite
}: Props) {
  return (
    <List>
      {displayedRepositories.map((repository) => (
        <RepositoryListItem
          repository={repository}
          isFavorite={favoriteRepositoryIds.includes(repository.id)}
          onFavorite={onFavorite}
        />
      ))}
    </List>
  );
}
