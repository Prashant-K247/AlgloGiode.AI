# LC Mentor - LeetCode AI Learning Assistant

## Project Overview

LC Mentor is a comprehensive learning tool designed to help developers solve LeetCode problems effectively without directly providing solutions. The project consists of two main components: a Chrome extension that integrates with LeetCode and a backend API server powered by Google's Gemini AI model.

Instead of giving away solutions, LC Mentor provides progressive hints and a controlled learning experience through a timer-based unlocking system. This encourages problem-solving skills while providing guidance when needed.

### Core Philosophy

The mentoring approach is structured to develop problem-solving abilities:
- Hint 1: Beginner-level guidance (100-150 words)
- Hint 2: Intermediate-level hints with stronger direction
- Hint 3: Final hints before revealing the complete solution
- Answer: Full code solution with explanations in multiple programming languages (Java, C++, Python)

---

## Features

### 1. Progressive Hints System
- Three-tier hint mechanism that progressively reveals more information
- Each hint is timed and unlocks the next hint after a delay (default: 60 seconds per hint)
- Hints are AI-generated based on the LeetCode problem description
- Status indicator shows which hint level is currently available

### 2. Multi-Language Solutions
- AI generates solutions in three programming languages:
  - Java
  - C++
  - Python
- Code follows LeetCode format and conventions strictly
- Includes brief explanations before code blocks

### 3. Interactive Sidebar Interface
- Fixed position sidebar that slides in from the right
- Dark theme matching LeetCode's interface
- Clean button layout for hint progression
- Real-time output display with smooth animations
- Timer visualization for hint unlock delays
- Close button and toggle functionality

### 4. Smart Problem Detection
- Automatically detects LeetCode problem descriptions
- Real-time page change detection for Single Page Application (SPA) navigation
- Auto-resets UI when navigating to a new problem
- Works across all LeetCode problem pages

### 5. AI-Powered Generation
- Leverages Google Gemini API (gemini-2.5-flash-lite) for intelligent hint and solution generation
- Contextual prompts tailored for learning purposes
- Strict formatting rules for consistent code output
- Handles both simple and complex algorithm problems

---

## Technology Stack

### Frontend (Extension)
- **Language**: JavaScript (Vanilla)
- **Styling**: CSS (embedded inline styles)
- **API Communication**: Fetch API
- **Extension Framework**: Chrome Manifest V3

### Backend Server
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Development**: Nodemon (auto-restart on file changes)
- **Environment Management**: dotenv
- **HTTP Client**: Axios
- **CORS**: Express CORS middleware
- **External API**: Google Generative Language API (Gemini)

### Dependencies Overview

#### Backend (package.json)
```json
{
  "axios": "^1.15.0",           // HTTP client for API calls
  "cors": "^2.8.6",             // Cross-Origin Resource Sharing
  "dotenv": "^17.4.1",          // Environment variable management
  "express": "^5.2.1",          // Web framework
  "nodemon": "^3.1.14"          // Development auto-reload
}
```

---

## Project Structure

```
Leetcode-ai-mentor/
├── Readme.md                    # Project documentation
├── backend/
│   ├── package.json            # Node.js dependencies and scripts
│   ├── server.js               # Express server with Gemini API integration
│   └── .env                    # Environment variables (not in repo)
└── extension/
    ├── manifest.json           # Chrome extension configuration
    └── content.js              # Content script for LeetCode integration
```

### File Descriptions

#### backend/package.json
Defines the Node.js project configuration, entry point (server.js), and all required dependencies. Includes npm scripts for starting the development server with Nodemon.

#### backend/server.js
Express.js server that:
- Listens on port 5000
- Provides a POST endpoint `/ai` for AI prompt processing
- Communicates with Google's Gemini 2.5 Flash Lite API
- Handles error responses gracefully
- Enables CORS for cross-origin requests from the extension

#### extension/manifest.json
Chrome extension manifest defining:
- Extension metadata (name, version, description)
- Required permissions (activeTab, scripting)
- Host permissions for LeetCode domain matching
- Content script injection rules

#### extension/content.js
Main extension logic containing:
- UI creation and styling (sidebar and toggle button)
- Event listeners for user interactions
- API communication with backend
- Timer and unlock mechanism
- Problem detection and description extraction
- Response formatting and display

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Chrome or Chromium-based browser
- Google Gemini API key

### Step 1: Clone and Navigate to Backend
```bash
cd backend
```

### Step 2: Install Backend Dependencies
```bash
npm install
```

This installs all required packages as specified in package.json

### Step 3: Configure Environment Variables
Create a `.env` file in the backend directory:
```
GEMINI_API=your_google_gemini_api_key_here
```

To get a Gemini API key:
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and paste it in the .env file

### Step 4: Start the Backend Server
```bash
npm start
```
server running on http://localhost:5000
```

The server will restart automatically if you modify server.js 

### Step 5: Load Extension in Chrome
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (top-right corner)
3. Click "Load unpacked"
4. Navigate to the `extension` folder and select it
5. The extension should now appear in your extensions list

### Step 6: Verify Setup
1. Navigate to any LeetCode problem
2. Look for the "AI-Mentor" button in the bottom-right corner
3. Click it to open the sidebar
4. Click "Hint 1" to test the integration

---

## Configuration

### Backend Configuration

#### API Endpoint
- **URL**: `http://localhost:5000/ai`
- **Method**: POST
- **Content-Type**: application/json

### Frontend Configuration

#### Backend URL (extension/content.js)
```javascript
const BACKEND_URL = "http://localhost:5000/ai";
---

## How to Use

### For Users

#### Opening the Mentor
1. Navigate to any LeetCode problem
2. Click the "AI-Mentor" button (fixed at bottom-right)
3. The sidebar slides in from the right

#### Using Hints
1. **Hint 1**: Click "Hint 1" to get beginner-level guidance
   - Returns 100-150 word hint
   - Unlocks Hint 2 after 60-second timer
2. **Hint 2**: Click when timer completes
   - Provides stronger, more specific guidance
   - Unlocks Hint 3 after timer
3. **Hint 3**: Final hint before solution
   - Strongest hint without revealing the answer
   - Unlocks "Reveal Answer" button
4. **Reveal Answer**: See complete code solutions in multiple languages

#### Switching Problems
- Simply navigate to a different LeetCode problem
- UI automatically resets
- All hints become available again

#### Closing the Sidebar
- Click the close button (×) in the sidebar header
- Or click "AI-Mentor" button again to toggle

### For Developers

#### Adding New Hint Types
Modify content.js to add new hint categories. Example:
```javascript
// Add to the prompt for customization
const res = await callAI(`Give complexity analysis hint.\n\n${desc}`);
```

#### Customizing AI Prompts
All prompts are in content.js. The Gemini API interprets these prompts. Examples:
```javascript
// Hint 1 - Beginner level
`Give beginner hint in 100 - 150 words.\n\n${desc}`

// Hint 2 - Stronger guidance
`Give stronger hint.\n\n${desc}`

// Complete solution with format
`You are a strict coding assistant...` (see content.js for full prompt)
```

#### Extending Language Support
In the answer generation prompt (content.js), modify the OUTPUT FORMAT section:
```javascript
C#:
\`\`\`csharp
<code>
\`\`\`

JavaScript:
\`\`\`javascript
<code>
\`\`\`
```

---

## API Documentation

### Endpoint: /ai

#### Request
```
POST /ai HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "prompt": "Your prompt text here"
}
```

#### Response - Success (200)
```json
{
  "text": "Generated response from Gemini API"
}
```

#### Response - Error (400)
```json
{
  "error": "Prompt is required"
}
```

#### Response - Error (500)
```json
{
  "error": "failed to fetch ai response"
}
```

### Component Breakdown

#### 1. Extension (Frontend)
**Responsibilities**:
- Detect and extract LeetCode problem descriptions
- Manage user interactions (button clicks)
- Control sidebar visibility and styling
- Display AI responses in formatted cards
- Implement timer mechanism for hint unlocking
- Handle page navigation (SPA support)

**Key Functions**:
- `getProblem()`: Extracts problem description from DOM
- `callAI(prompt)`: Sends prompt to backend
- `delayUnlock(btn, label, seconds)`: Manages timer and button unlocking
- `formatResponse(text)`: Converts markdown code blocks to HTML
- `addOutput(title, text)`: Displays responses in sidebar
- `resetUI()`: Resets all UI elements when navigating

#### 2. Backend Server (API)
**Responsibilities**:
- Receive prompts from extension
- Communicate with Gemini API
- Parse and format AI responses
- Handle errors gracefully
- Manage CORS for extension requests

**Request Flow**:
1. Extension sends POST request with prompt
2. Server validates prompt parameter
3. Server constructs Gemini API request
4. Gemini API generates response
5. Server extracts text from API response
6. Server returns JSON with generated text

#### 3. External APIs
- **Google Gemini API**: Processes prompts and generates hints/solutions
- **LeetCode DOM**: Problem descriptions extracted via CSS selectors

---

### Code Quality Considerations

**Current Implementation**:
- Async/await for API calls
- Error handling with try-catch
- Proper CORS configuration
- Environment variable management
- Nodemon for development convenience

**Potential Improvements**:
- Add input validation for prompts
- Implement rate limiting
- Add logging system
- Cache responses to reduce API calls
- Unit tests for backend endpoints
- Error recovery mechanisms

---

## Development Workflow

### Testing Flow

1. Start backend server (`npm start`)
2. Navigate to LeetCode problem
3. Open extension sidebar
4. Test each hint level
5. Check browser console for errors (F12)
6. Check server console for API response logs

### Making Changes

**Backend Changes**:
- Edit `server.js`
- Server auto-restarts (Nodemon)
- No extension reload needed

**Extension Changes**:
- Edit `extension/content.js` or `extension/manifest.json`
- Reload extension in `chrome://extensions/`
- Refresh LeetCode page

---

## Performance Considerations

### API Response Time
- Average Gemini API response: 2-5 seconds
- Display shows loading status during generation
- Consider caching identical prompts for same problems

### Sidebar Performance
- Sidebar width: 500px (fixed)
- Smooth transitions: 0.3s
- No performance impact on page rendering

### Memory Usage
- Sidebar DOM elements: ~20-30 elements
- Event listeners: ~5-6 listeners (no memory leaks detected)
- API response cached in DOM until next navigation

---

## Future Enhancement Ideas

1. **User Progress Tracking**: Store which problems user attempted
2. **Difficulty Ratings**: Filter hints by problem difficulty
3. **Time Analytics**: Track time spent on each hint level
4. **Community Hints**: Allow users to share custom hints
5. **Offline Mode**: Cache responses for offline access
6. **Dark/Light Theme Toggle**: User preference storage
7. **Multi-Language Support**: UI language translations
8. **Code Explanation**: Generate explanations for given solutions
9. **Performance Analysis**: Explain time/space complexity
10. **Similar Problems**: Suggest related problems

---

## Security Considerations

### Current Implementation
- API key stored in `.env` (not in repo)
- CORS enabled for local development
- No authentication required (local only)
- Input not sanitized (backend should validate)

### Production Recommendations
1. Restrict CORS to specific domain
2. Implement API key authentication
3. Add rate limiting per IP/user
4. Validate and sanitize all inputs
5. Use HTTPS in production
6. Implement request logging
7. Add error tracking (Sentry, etc.)

---
---

## Contributing

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Keep functions focused and modular
- Test changes locally before submitting

### Reporting Issues
Kindly report any issue to mail: prshant247@gmail.com
Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser version
- Console errors (if any)
- Backend server logs

---

## Changelog

### Version 1.0 (Current Release)
- Initial release
- Three-tier hint system with timers
- Multi-language solution generation
- Chrome extension integration
- Express.js backend
- Gemini API integration

---