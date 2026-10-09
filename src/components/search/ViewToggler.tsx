import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ViewList, ViewModule } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../rtk/store";
import { selectVideosView, setView } from "../../rtk/searchSlice";

export const ViewToggler = () => {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectVideosView);
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, newValue) => dispatch(setView(newValue))}
    >
      <ToggleButton value="list">
        <ViewList />
      </ToggleButton>
      <ToggleButton value="module">
        <ViewModule />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
