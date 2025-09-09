# NisSavings

A small savings Savings Tracker that allows a parent to create a saving plan for their child's school fees (or goal), make contributions, and monitor progress

## Features

1. Create and manage savings goal
2. Make contributions
3. Monitor progress with a simple progress bar
4. Responsive design with Bootstrap.
5. Local storage for data persistence.

## Setup Instructions

### Prerequisites

Ensure you've installed the following:

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)

### Installation

1. Clone the repository
   `git clone https://github.com/MugoBrian/savings-tracker

2. Install the dependencies
   Navigate to the root directory
   `cd savings-tracker`

Then run:

`npm install` or `yarn install`

### Required depencies

The project uses the main dependencies list, enusre they're installed:

```
"dependencies": {
    "bootstrap": "^5.3.8",
    "react": "^19.1.1",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.8.2"
  },

```

### Development Seturn

1. Start the development server

`npm run dev` or `yarn run dev`

2. Open your browser
   Open the application on `http://localhost:5173/`


## Known Limitations

Some of the limitations of the savings tracker app is:
1. You can neither Edit, Update nor Delete the savings goal or the contributions.
2. No charts for better visual cues
3. The UI is not appealing, however, it's still user friendly for an MVP.
4. Web Accessibility not implemented.


## Improvements (to be made with more time):

1. Implement "Allow 'Withdraw` from savings plan" feature.
2. Simple charts (line/bar) to show contributions over time.
3. Improved dashboard summary.
4. Improve UI/UX.
5. Implementation of WCAG best practices
4. Authentication and profile management.
5. Alerts and notifications.
6. Adding a REST API backend server and a persistent database.