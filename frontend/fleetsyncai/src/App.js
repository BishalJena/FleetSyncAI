// import logo from './logo.svg';
// import './App.css';
// import BookingComponent from './components/bookingSystem/BookingComponent';

// function App() {
//   return (
//     <div className="App">
//        <BookingComponent />
//     </div>
//   );
// }

// export default App;
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Import the drivers router
const ownersRouter = require('../../../backend/ownerInterface/truckOwnerRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the drivers router for any routes starting with /drivers
app.use('/owners', ownersRouter);

// Handle the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Owners API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});