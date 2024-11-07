<h1>E-commerce store</h1>
<p>This is a basic e-commerce application using Node.js and Express.js, with ejs as a template engine and mongodb as a database. This project includes user authentication, session managment, flash messaging and basic crud operations for products</p>

<h2>Key features</h2>
<h3>User authencition</h3>
<p>Uses session for login managment with <strong>express-session</strong></p>
<h3>Database inetgration</h3>
<p>MongoDB connected via mongoose</p>
<h3>Template Engine</h3>
<p>EJS to render dynamic pages.</p>
<h3>File Upload multer</h3>
<p>is a setup for handling useful pages(useful for product image).</p>
<p>EJS to render dynamic pages.</p>
<h3>Environmental variables</h3>
<p>Managed thorough dotenv for sensitive information.</p>
<p>EJS to render dynamic pages.</p>
<h3>Falsh Messages</h3>
<p>Show feedback to users for login/logout pages..</p>

<h2>Project structure</h2>
<p>project-root/
├── config/                   # Configuration files
│   └── db/
│       └── conn.js           # MongoDB connection
├── controllers/              # Controllers for handling logic
├── middlewares/              # Custom middleware (e.g., flash)
├── models/                   # Mongoose schemas/models
├── public/                   # Static files (CSS, images, etc.)
├── routes/                   # Route definitions
│   ├── userRoutes.js
│   ├── ownerRoutes.js
│   ├── productRoutes.js
│   └── indexRoute.js
├── views/                    # EJS view templates
│   ├── index.ejs
│   ├── user/
│   ├── owner/
│   └── product/
├── .env                      # Environment variables
├── .gitignore                # Ignore node_modules, .env, etc.
├── app.js                    # Main application file
└── package.json        </p>

