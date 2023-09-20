# YouTube Clone

A simple YouTube clone built using Vite and React.

Live demo [HERE](https://stefanpython.github.io/youtube-clone/)

### Features

- **Home Page:** View a list of videos on the home page.
- **Infinite Scroll:** As you scroll down, more videos will load automatically.
- **Search:** Use the search bar to find videos related to your search query.
- **Video Playback:** Click on a video to play it individually.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/youtube-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd youtube-clone
   ```
3. Install the project dependencies:
   ```bash
   npm install
   ```

### Setting up YouTube Data API

In order to use the search and video retrieval functionality, you will need a YouTube Data API v3 key. Follow these steps to obtain your API key:

1. Visit the Google Cloud Console.

2. Create a new project or select an existing one.

3. In the left sidebar, click on "APIs & Services" and then "Library."

4. Search for "YouTube Data API v3" and enable it for your project.

5. In the left sidebar, click on "APIs & Services" and then "Credentials."

6. Click on the "Create Credentials" button and select "API Key."

7. Your API key will be generated. Copy it and replace "YOUR_API_KEY" in the project code with your actual API key.

### Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your web browser and visit http://localhost:3000 to view the YouTube clone.
