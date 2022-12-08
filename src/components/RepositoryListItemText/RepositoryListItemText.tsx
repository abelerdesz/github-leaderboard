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
            {/* todo just use text-ellipsis */}
            {repository.description}
          </Typography>
          <Box display="flex" mt={2}>
            <Typography variant="body2" color="text.secondary">
              {repository.language?.length && (
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
  );
}
