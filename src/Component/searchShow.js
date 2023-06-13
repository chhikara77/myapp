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
console.log(searchResults)
},[token])
  const handleSearch = (e) => {
    e.preventDefault();
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
        return data.json()
        
        // Redirect to the search page or perform any other actions
      })
      .then(data => {
        // Use the retrieved data
        console.log(data);
        setSearchResults(data.shows);
      })
      .catch(error => {
        console.error(error);
      });
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
          {searchResults.map((item) => (
            <Card key={item.show.id} variant="outlined" style={{ margin: '10px 0',display:"flex" }}>
              <CardMedia
                component="img"
                alt={item.show.name}
                height="300"
                width="200"
                image={item.show.image.medium}
                title={item.show.name}
                style={{ width: '20%' }}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {item.show.name}
                </Typography>
                <Typography color="textSecondary">{item.show.summary}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Type:</strong> {item.show.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Language:</strong> {item.show.language}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Genres:</strong> {item.show.genres.join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Status:</strong> {item.show.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong> Schedule:</strong> {item.show.schedule.days.join(', ')} at {item.show.schedule.time}
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
                    
