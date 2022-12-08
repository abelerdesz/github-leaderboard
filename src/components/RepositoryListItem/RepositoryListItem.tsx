import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction
} from "@mui/material";
import { Repository } from "models/Repository";
import FavoriteButton from "components/FavoriteButton";
import RepositoryListItemText from "components/RepositoryListItemText";
import theme from "theme/theme";

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
    <Box py={1}>
      <ListItem disableGutters>
        <ListItemAvatar sx={{ minWidth: theme.spacing(14) }}>
          <Avatar
            sx={{ width: theme.spacing(11), height: theme.spacing(11) }}
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
    </Box>
  );
}
