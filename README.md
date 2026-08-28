
****************************************
    Project Folder Structure
****************************************



my-mean-app/                  # Root project directory
├── .git/                     # Git tracking directory
├── .gitignore                # Global ignore rules (ignores node_modules, .env, etc.)
├── README.md                 # Documentation for setup and deployment
├── package.json              # Root package (scripts to run client & server simultaneously)
│
├── client/                   # --- ANGULAR FRONTEND ---
│   ├── .gitignore            # Angular-specific Git ignores (dist, .angular)
│   ├── package.json          # Frontend dependencies
│   ├── angular.json          # Angular CLI configuration
│   └── src/
│       ├── app/              # Application components, services, and modules
│       ├── assets/           # Static files (images, fonts)
│       └── environments/     # Environment-specific variables
│
└── server/                   # --- NODE.JS / EXPRESS BACKEND ---
    ├── .env                  # Local secret environment variables (DB URI, Keys)
    ├── package.json          # Backend dependencies
    ├── src/
    │   ├── config/           # Database connections and configurations
    │   ├── controllers/      # Route handler functions (business logic)
    │   ├── models/           # MongoDB schemas (e.g., Mongoose schemas)
    │   ├── routes/           # Express API endpoints mapping to controllers
    │   ├── middlewares/      # Auth checks, error handling, validation
    │   └── app.js            # Main entry point (starts Express server)
