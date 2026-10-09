import { Box, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../rtk/store";
import { selectSearchState } from "../../rtk/searchSlice";
import { ViewToggler } from "./ViewToggler";
import { VideoItem } from "./VideoItem";

export const VideosList = () => {
  const dispatch = useAppDispatch();
  const { view, videos, query } = useAppSelector(selectSearchState);
  if (videos.length > 0)
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <Typography>Видео по запросу "{query}"</Typography>
          <ViewToggler />
        </Box>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {videos.map(({ id, title, channelTitle, imgUrl }) => {
            const cardSize = view === "list" ? 12 : 4;
            return (
              <Grid key={id} size={cardSize}>
                <VideoItem
                  title={title}
                  channel={channelTitle}
                  imgUrl={imgUrl}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
};

const res = {
  data: {
    kind: "youtube#searchListResponse",
    etag: "O4G8jS8IPS_dkjfOP8c163KBgKg",
    nextPageToken: "CAUQAA",
    regionCode: "BY",
    pageInfo: {
      totalResults: 1000000,
      resultsPerPage: 5,
    },
    items: [
      {
        kind: "youtube#searchResult",
        etag: "NzhDulA3sydewjnkdOVDX6PnUYw",
        id: {
          kind: "youtube#video",
          videoId: "YQHsXMglC9A",
        },
        snippet: {
          publishedAt: "2015-10-23T06:54:18Z",
          channelId: "UCsRM0YB_dabtEPGPTKo-gcw",
          title: "Adele - Hello (Official Music Video)",
          description:
            'Listen to "Easy On Me" here: http://Adele.lnk.to/EOM Pre-order Adele\'s new album "30" before its release on November 19: ...',
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/YQHsXMglC9A/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/YQHsXMglC9A/mqdefault.jpg",
              width: 320,
              height: 180,
            },
            high: {
              url: "https://i.ytimg.com/vi/YQHsXMglC9A/hqdefault.jpg",
              width: 480,
              height: 360,
            },
            standard: {
              url: "https://i.ytimg.com/vi/YQHsXMglC9A/sddefault.jpg",
              width: 640,
              height: 480,
            },
            maxres: {
              url: "https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg",
              width: 1280,
              height: 720,
            },
          },
          channelTitle: "Adele",
          liveBroadcastContent: "none",
          publishTime: "2015-10-23T06:54:18Z",
        },
      },
    ],
  },
  status: 200,
  statusText: "",
  headers: {
    "content-encoding": "gzip",
    "content-length": "1487",
    "content-type": "application/json; charset=UTF-8",
    date: "Sat, 03 Oct 2026 11:33:19 GMT",
    server: "scaffolding on HTTPServer2",
    vary: "Origin, X-Origin, Referer",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
      legacyInterceptorReqResOrdering: true,
      advertiseZstdAcceptEncoding: false,
      validateStatusUndefinedResolves: true,
    },
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
    },
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
      key: "AIzaSyB4yMtoYA7T_F0O1Ht1Set-S5LuMXxHyZU",
      part: "snippet",
      q: "hello",
      type: "video",
    },
    method: "get",
    url: "/search",
    allowAbsoluteUrls: true,
  },
  request: {},
};
