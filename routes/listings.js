const express = require('express');
const app = express();

app.get('/listings', (req, res) => {
  dbQueries.getItems() // Fetch items from the database using your queries module
    .then(items => {
      res.render('listings', { items }); // Render the 'listings.ejs' template with data
    })
    .catch(error => {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
