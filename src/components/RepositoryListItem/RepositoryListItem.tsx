import {
  Avatar,
  Box,
  Chip,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@mui/material";
import { Repository } from "../../models/Repository";
import FavoriteButton from "../FavoriteButton";

interface Props {
  repository: Repository;
  favoriteRepoIds: number[];
  onFavorite: (id: number) => void;
}

export default function RepositoryListItem({
  repository,
  favoriteRepoIds,
  onFavorite
}: Props) {
  return (
    // todo use boxes instead of sx
    <ListItem sx={{ py: 2 }} key={repository.id} disableGutters>
      {/* todo use theme.spacing */}
      <ListItemAvatar sx={{ minWidth: 108 }}>
        <Avatar
          sx={{ width: 88, height: 88 }}
          variant="rounded"
          alt={`Avatar for project ${repository.name}`}
          src={repository.owner?.avatar_url}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Box display="flex">
            <Typography fontWeight={600}>{repository.name}</Typography>
          </Box>
        }
        secondary={
          <>
            <Typography
              color="text.secondary"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              mr={8}
            >
              {/* todo just use text-ellipsis */}
              {repository.description}
            </Typography>
            <Box display="flex" mt={2}>
              <Typography variant="body2" color="text.secondary">
                {repository.language && (
                  <>
                    <Chip label={repository.language} size="small" />
                    <Typography sx={{ mx: 1 }} component="span">
                      ·
                    </Typography>
                  </>
                )}
                {repository.owner && (
                  <>
                    by{" "}
                    <Link href={repository.owner.html_url}>
                      {repository.owner?.login}
                    </Link>{" "}
                    <Typography sx={{ mx: 1 }} component="span">
                      ·
                    </Typography>
                  </>
                )}
                <Link href={repository.html_url} target="_blank">
                  View on GitHub
                </Link>{" "}
              </Typography>
            </Box>
          </>
        }
      ></ListItemText>
      <ListItemSecondaryAction>
        <FavoriteButton
          starCount={repository.stargazers_count}
          isActive={favoriteRepoIds.includes(repository.id)}
          onClick={() => onFavorite(repository.id)}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
