import { Dialog, DialogContent, DialogTitle, TextField, Box, Button, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';

export default function CityModal({ open, onClose, cities,setSelectedCity }) {
  const [searchValue, setSearchValue] = useState("");
   const [filteredCities, setFilteredCities] = useState(cities); 
  // Filter cities based on search
  useEffect(()=>{
    const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );
setFilteredCities([...filteredCities])

  },[searchValue])
 

  const handleSelectCity = (city) => {
    setSelectedCity(city.name);
    // alert(`Selected: ${city.name}`);
    setSearchValue("");
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Bike Rentals</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        {/* Search Box */}
        <TextField
          fullWidth
          placeholder="Search or type city to select"
          variant="outlined"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#FDC500', fontSize: '24px' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchValue && (
                  <IconButton
                    onClick={() => setSearchValue("")}
                    edge="end"
                    size="small"
                    sx={{
                      color: '#999',
                      '&:hover': {
                        color: '#FDC500',
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            mt: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: '#f5f5f5',
              border: '2px solid #e0e0e0',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#FDC500',
                backgroundColor: '#ffffff',
              },
              '&.Mui-focused': {
                borderColor: '#FDC500',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 0 3px rgba(253, 197, 0, 0.1)',
              },
            },
            '& .MuiOutlinedInput-input': {
              padding: '12px 12px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#333',
              '&::placeholder': {
                color: '#999',
                opacity: 0.7,
              },
            },
          }}
          size="small"
        />

        {/* Cities Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: { xs: 1.5, sm: 2 },
            maxHeight: { xs: '50vh', sm: '60vh', md: '400px' },
            overflowY: 'auto',
            padding: '8px 0',
          }}
        >
          {filteredCities.map((city) => (
            <Box
              key={city.id}
              onClick={() => handleSelectCity(city)}
              sx={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: { xs: '100px', sm: '110px', md: '120px' },
                backgroundImage: `url(${city.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {/* Dark overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }}
              />
              {/* City name */}
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  padding: '8px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
              >
                {city.name}
              </Box>
            </Box>
          ))}
        </Box>

        {/* No results message */}
        {filteredCities.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3, color: 'gray' }}>
            No cities found
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
