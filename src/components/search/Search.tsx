import { Box } from "@mui/material";

import { VideosList } from "./VideosList";
import { SearchPanel } from "./SearchPanel";

export const Search = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 2,
        }}
      >
        <SearchPanel />
      </Box>
      <VideosList />
    </>
  );
};
