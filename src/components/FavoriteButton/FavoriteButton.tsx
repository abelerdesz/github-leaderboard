import { Star, StarOutline } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";

interface Props {
  starCount: number;
  isActive?: boolean;
  onClick: () => void;
}

export default function FavoriteButton({
  isActive,
  onClick,
  starCount
}: Props) {
  return (
    <Button
      variant="outlined"
      color={isActive ? "primary" : "secondary"}
      size="large"
      onClick={onClick}
      sx={{
        minWidth: 80,
        borderColor: isActive ? yellow[600] : "secondary"
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {isActive ? (
          <Star sx={{ opacity: 0.8, color: yellow[800] }} />
        ) : (
          <StarOutline color="secondary" sx={{ opacity: 0.8 }} />
        )}
        <Typography
          variant="body2"
          fontWeight={600}
          color="secondary.dark"
          sx={{ mt: 1 }}
        >
          {isActive ? starCount + 1 : starCount}
        </Typography>
      </Box>
    </Button>
  );
}
