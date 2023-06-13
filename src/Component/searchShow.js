import React, { useEffect, useState,useContext } from 'react';
import { TextField, Button, Card, CardContent, CardMedia, Typography, Snackbar } from '@material-ui/core';
import { userContext } from "../App";

const SearchForm = (props) => {
  const {token,setToken} = useContext(userContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
useEffect(()=>{
console.log(token)
},[token])
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("token search",token)
    // Perform search logic here
    // For demonstration purposes, let's assume searchResults is an array of TV show objects
    const firstShowId = searchTerm;
    fetch(`https://tv-seriesapi.onrender.com/api/search?title=${firstShowId}`, {
  headers: {
    'Authorization': `Bearer ${token}` // Replace `token` with your actual token value
  }
})
  .then((data) => {
        // Process the data received from the API
        console.log(data);
        setSearchResults(data);
        
        // Redirect to the search page or perform any other actions
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  
    setSearchResults(searchResults);
    // Reset search term
    setSearchTerm('');
    setShowSnackbar(searchResults.length === 0);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search TV Shows"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <Typography variant="h6">Search Results:</Typography>
          {searchResults.map((show) => (
            <Card key={show.id} variant="outlined" style={{ margin: '10px 0' }}>
              <CardMedia
                component="img"
                alt={show.name}
                height="200"
                image={show.image.medium}
                title={show.name}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {show.name}
                </Typography>
                <Typography color="textSecondary">{show.summary}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Type:</strong> {show.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Language:</strong> {show.language}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Genres:</strong> {show.genres.join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {show.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong> Schedule:</strong> {show.schedule.days.join(', ')} at {show.schedule.time}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}

<Snackbar
        open={showSnackbar}
        onClose={handleSnackbarClose}
        message="No results found."
        autoHideDuration={3000}
      />
                        </div>
                      );
                    };
                    
                    export default SearchForm;
                    
