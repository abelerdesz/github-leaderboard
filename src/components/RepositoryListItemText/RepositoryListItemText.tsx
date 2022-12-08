import { Box, Chip, ListItemText, Typography, Link } from "@mui/material";
import { Repository } from "models/Repository";

interface LanguageTextProps {
  language: string;
}

function LanguageText({ language }: LanguageTextProps) {
  return (
    <>
      <Chip label={language} size="small" />
      <Typography mx={1} component="span">
        ·
      </Typography>
    </>
  );
}

interface OwnerTextProps {
  name: string;
  url: string;
}

function OwnerText({ name, url }: OwnerTextProps) {
  return (
    <Box component="span" display={{ xs: "none", sm: "inline" }}>
      by{" "}
      <Link href={url} target="_blank">
        {name}
      </Link>{" "}
      <Typography mx={1} component="span">
        ·
      </Typography>
    </Box>
  );
}

interface RepositoryListItemTextProps {
  repository: Repository;
}

export default function RepositoryListItemText({
  repository
}: RepositoryListItemTextProps) {
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
                <LanguageText language={repository.language} />
              )}
              {repository.owner && (
                <OwnerText
                  name={repository.owner.login}
                  url={repository.owner.html_url}
                />
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
