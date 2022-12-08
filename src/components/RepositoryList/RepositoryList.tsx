import { List } from "@mui/material";
import { Repository } from "../../models/Repository";
import RepositoryListItem from "../RepositoryListItem";

interface Props {
  displayedRepos: Repository[];
  favoriteRepoIds: number[];
  onFavorite: (id: number) => void;
}

export default function RepositoryList({
  displayedRepos,
  favoriteRepoIds,
  onFavorite
}: Props) {
  return (
    <List>
      {displayedRepos.map((repository) => (
        <RepositoryListItem
          repository={repository}
          favoriteRepoIds={favoriteRepoIds}
          onFavorite={onFavorite}
        />
      ))}
    </List>
  );
}
