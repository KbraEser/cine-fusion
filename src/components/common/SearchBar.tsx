import React, { useState, useCallback } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Popper,
  ClickAwayListener,
  CircularProgress,
  Typography,
} from '@mui/material';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { searchMulti, type SearchResult as ApiSearchResult } from '../../services/searchService';

interface SearchResult {
  id: number;
  title: string;
  poster_path?: string;
  type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
}

const SearchBar: React.FC = () => {
  const { language } = useSelector((state: RootState) => state.language);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const placeholder = language === 'tr-TR' ? 'Film veya dizi ara...' : 'Search movies or series...';

  const handleSearch = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchMulti({
        query,
        language: language === 'tr-TR' ? 'tr-TR' : 'en-US',
      });

      const formattedResults: SearchResult[] = response.results
        .filter((item: ApiSearchResult) => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 8) 
        .map((item: ApiSearchResult) => ({
          id: item.id,
          title: item.title || item.name || 'Başlık Yok',
          poster_path: item.poster_path,
          type: item.media_type as 'movie' | 'tv',
          release_date: item.release_date,
          first_air_date: item.first_air_date,
        }));

      setSearchResults(formattedResults);
      setIsOpen(formattedResults.length > 0);
    } catch (error) {
      console.error('Arama hatası:', error);
      setSearchResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsOpen(false);
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'movie') {
      navigate(`/movie-detail/${result.id}`);
    } else if (result.type === 'tv') {
      navigate(`/series/${result.id}`);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', mx: { xs: 1, md: 2 } }}>
        <Paper
          ref={setAnchorEl}
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: 200, sm: 280, md: 350 },
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 74, 74, 0.3)',
            borderRadius: 2,
            '&:hover': {
              border: '1px solid rgba(255, 74, 74, 0.5)',
            },
            '&:focus-within': {
              border: '1px solid #ff4a4a',
            }
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <IconButton sx={{ p: '10px', color: '#ff4a4a' }} aria-label="search">
            <FaSearch />
          </IconButton>
          <InputBase
            sx={{ 
              ml: 1, 
              flex: 1,
              color: 'white',
              '& input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              }
            }}
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            inputProps={{ 'aria-label': 'search movies and series' }}
          />
          {searchTerm && (
            <IconButton 
              sx={{ p: '10px', color: '#ff4a4a' }} 
              aria-label="clear"
              onClick={handleClear}
            >
              <FaTimes />
            </IconButton>
          )}
        </Paper>

        <Popper
          open={(isOpen && searchResults.length > 0) || isLoading}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{ zIndex: 1300, width: anchorEl?.offsetWidth }}
        >
          <Paper
            sx={{
              mt: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 74, 74, 0.3)',
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} sx={{ color: '#ff4a4a' }} />
                <Typography sx={{ ml: 1, color: 'white' }}>
                  {language === 'tr-TR' ? 'Aranıyor...' : 'Searching...'}
                </Typography>
              </Box>
            ) : searchResults.length === 0 && searchTerm.length >= 2 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography sx={{ color: 'white' }}>
                  {language === 'tr-TR' ? 'Sonuç bulunamadı' : 'No results found'}
                </Typography>
              </Box>
            ) : (
              <List>
                {searchResults.map((result) => (
                  <ListItem
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 74, 74, 0.1)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={result.poster_path ? `https://image.tmdb.org/t/p/w92${result.poster_path}` : undefined}
                        alt={result.title}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={result.title}
                      secondary={
                        result.type === 'movie' 
                          ? (language === 'tr-TR' ? 'Film' : 'Movie')
                          : (language === 'tr-TR' ? 'Dizi' : 'TV Series')
                      }
                      sx={{
                        '& .MuiListItemText-primary': {
                          color: 'white',
                        },
                        '& .MuiListItemText-secondary': {
                          color: '#ff4a4a',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar; 