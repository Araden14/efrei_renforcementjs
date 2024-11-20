const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@efrei-arnaud.qg8vz.mongodb.net/?retryWrites=true&w=majority&appName=efrei-arnaud`
const booksRoutes = require('./routes/Book')
const booksViewRoutes = require('./views/routes/Bookview')
const authRoutes = require('./routes/Auth')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');



app.use(express.json())
app.use(cors({
    origin: '*'
}));
// View engine
app.set('view engine', 'ejs');
app.set('views', 'views/templates'); 

// API routes
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);

// View routes
app.use('/books', booksViewRoutes);

// Swagger UI

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Api',
            version: '1.0.0',
            description: 'API for managing books and users'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server'
            },
            {
                url: 'https://api.example.com',
                description: 'Production server'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// Database connection
mongoose.connect(uri)
    .then(() => {
        console.log('Connection has been established successfully');
    }).catch((error) => {
        console.error('Unable to connect to database: ', error.message); // Log the error message
        console.error('Error details:', error); // Log the entire error object for more details
    });



// Server listening
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})