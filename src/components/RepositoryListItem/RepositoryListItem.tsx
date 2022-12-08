import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@mui/material";
import { Repository } from "models/Repository";
import FavoriteButton from "components/FavoriteButton";
import RepositoryListItemText from "components/RepositoryListItemText";

interface Props {
  repository: Repository;
  isFavorite: boolean;
  onFavorite: (id: number) => void;
}

export default function RepositoryListItem({
  repository,
  isFavorite,
  onFavorite
}: Props) {
  return (
    // todo use boxes instead of sx
    <ListItem sx={{ py: 2 }} disableGutters>
      {/* todo use theme.spacing */}
      <ListItemAvatar sx={{ minWidth: 108 }}>
        <Avatar
          sx={{ width: 88, height: 88 }}
          variant="rounded"
          alt={`Avatar for project ${repository.name}`}
          src={repository.owner?.avatar_url}
        />
      </ListItemAvatar>
      <RepositoryListItemText repository={repository} />
      <ListItemSecondaryAction>
        <FavoriteButton
          starCount={repository.stargazers_count}
          isActive={isFavorite}
          onClick={() => onFavorite(repository.id)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
