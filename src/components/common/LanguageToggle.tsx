import { 
  Select, 
  MenuItem, 
  FormControl, 
  Box, 
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/slices/languageSlice";
import type { RootState } from "../../store/store";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.language);

  const handleChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
  };

  const languages = [
    { 
      code: 'en-US', 
      label: 'English', 
      flag: '/flags/us.svg',
      shortLabel: 'EN'
    },
    { 
      code: 'tr-TR', 
      label: 'Türkçe', 
      flag: '/flags/tr.svg',
      shortLabel: 'TR'
    }
  ];

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl size="small" fullWidth>
        <Select
          value={language}
          onChange={(e) => handleChange(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            const selectedLang = languages.find(lang => lang.code === selected);
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img 
                  src={selectedLang?.flag} 
                  alt={selectedLang?.label}
                  style={{ 
                    width: '20px', 
                    height: '15px', 
                    borderRadius: '2px',
                    objectFit: 'cover'
                  }}
                />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {selectedLang?.shortLabel}
                </Typography>
              </Box>
            );
          }}
          sx={{
            color: '#ff4a4a',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(255, 74, 74, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgba(255, 74, 74, 0.6)',
            },
            '& .MuiSelect-icon': {
              color: '#ff4a4a',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 74, 74, 0.1)',
                  },
                },
              },
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img 
                  src={lang.flag} 
                  alt={lang.label}
                  style={{ width: '20px', height: '15px' }}
                />
                <Typography>{lang.label}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageToggle;
