import { Button, IconButton, TextField } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getVideos, selectSearchQuery, setQuery } from "../../rtk/searchSlice";
import { useAppDispatch, useAppSelector } from "../../rtk/store";

export const SearchPanel = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);
  const handleSearch = () => {
    if (query) {
      dispatch(getVideos({ query }));
    }
  };
  return (
    <>
      <TextField
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value.trim()))}
        sx={{ width: "50%" }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton>
                <StarBorderIcon />
              </IconButton>
            ),
          },
        }}
      />
      <Button onClick={handleSearch}>Найти</Button>
    </>
  );
};
