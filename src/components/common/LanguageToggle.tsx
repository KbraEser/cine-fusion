import { Switch, FormControlLabel, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleLanguage } from "../../store/reducers/languageReducer";
import type { RootState } from "../../store/store";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.language);

  const handleChange = () => {
    dispatch(toggleLanguage());
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography style={{ color: "red" }}>EN</Typography>
      <FormControlLabel
        sx={{ m: 0 }}
        control={
          <Switch
            checked={language === "tr-TR"}
            onChange={handleChange}
            color="primary"
          />
        }
        label=""
      />
      <Typography style={{ color: "red" }}>TR</Typography>
    </Box>
  );
};

export default LanguageToggle;
