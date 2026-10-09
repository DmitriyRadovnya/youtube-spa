import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import youtubeApi from "../api/youtubeApi";

type SearchStore = {
  query: string;
  videos: VideoItem[];
  view: "module" | "list";
  savedQuery: SavedQuery[];
};

type VideoItem = {
  id: string;
  title: string;
  channelTitle: string;
  imgUrl: string;
};

type SavedQuery = {
  query: string;
};

const initialState: SearchStore = {
  query: "",
  videos: [],
  view: "module",
  savedQuery: [],
};

type GetVideosRequest = {
  query: string;
  maxResults?: number;
};

type ResponseVideoItem = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    description: string;
    thumbnails: {
      high: VideoThumbnail;
    };
  };
};

type VideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

type GetVideosResponse = {
  items: ResponseVideoItem[];
};

export const getVideos = createAsyncThunk<
  GetVideosResponse,
  GetVideosRequest,
  { rejectValue: string }
>("search/videos", async ({ query, maxResults = 12 }, thunkAPI) => {
  try {
    const response = await youtubeApi.get("/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        maxResults,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка поиска видео");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  selectors: {
    selectSearchState: (state) => state,
    selectSearchQuery: (state) => state.query,
    selectVideosView: (state) => state.view,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    saveQuery(state, action) {
      state.savedQuery.push({ query: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.videos = action.payload.items.map(
        ({
          id: { videoId },
          snippet: {
            title,
            channelTitle,
            thumbnails: {
              high: { url },
            },
          },
        }) => {
          return { title, channelTitle, imgUrl: url, id: videoId };
        },
      );
    });
  },
});

export const { setQuery, setView, saveQuery } = searchSlice.actions;
export const { selectSearchQuery, selectVideosView, selectSearchState } =
  searchSlice.selectors;
export default searchSlice.reducer;
