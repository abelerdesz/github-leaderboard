import { Box, Chip, ListItemText, Typography, Link } from "@mui/material";
import { Repository } from "models/Repository";

interface Props {
  repository: Repository;
}

export default function RepositoryListItemText({ repository }: Props) {
  return (
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
            mr={9}
          >
            {repository.description}
          </Typography>
          <Box display="flex" mt={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              component="aside"
            >
              {repository.language?.length && (
                <>
                  <Chip label={repository.language} size="small" />
                  <Typography mx={1} component="span">
                    ·
                  </Typography>
                </>
              )}
              {repository.owner && (
                <Box component="span" display={{ xs: "none", sm: "inline" }}>
                  by{" "}
                  <Link href={repository.owner.html_url}>
                    {repository.owner?.login}
                  </Link>{" "}
                  <Typography mx={1} component="span">
                    ·
                  </Typography>
                </Box>
              )}
              <Link href={repository.html_url} target="_blank">
                View on GitHub
              </Link>{" "}
            </Typography>
          </Box>
        </>
      }
    ></ListItemText>
  );
}
