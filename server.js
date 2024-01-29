const app = require('./app');
const withDB = require('./db');

const PORT = process.env.PORT || 5005;

withDB(() => {
  // Middleware for handling 404 errors
  app.use((req, res, next) => {
    res.status(404).send("404 Page");
    
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

