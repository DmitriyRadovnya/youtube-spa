import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useAppSelector } from "../../rtk/store";
import { selectVideosView } from "../../rtk/searchSlice";

type VideoItemProps = {
  channel: string;
  title: string;
  imgUrl: string;
};

export const VideoItem: FC<VideoItemProps> = ({ channel, title, imgUrl }) => {
  const view = useAppSelector(selectVideosView);
  const isList = view === "list";

  return (
    <Card sx={{ borderRadius: 2, height: "100%" }}>
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: isList ? "row" : "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            width: isList ? 200 : "100%",
            alignSelf: "stretch",
          }}
        >
          <CardMedia
            component="img"
            image={imgUrl}
            alt={title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            pt: 2,
            flexGrow: 1,
            minWidth: 0,
            height: isList ? "auto" : 80,
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textAlign: isList ? "start" : "center",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              textAlign: isList ? "start" : "center",
            }}
          >
            {channel}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
