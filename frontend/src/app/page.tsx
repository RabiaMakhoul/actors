'use client';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatPanel } from "../components/ChatPanel";
import { PreviewProject, NavigationState } from "../../src/types/index";
import SandpackWrapper from "../components/SandpackWrapper";
import { ProjectContext } from '../contexts/ProjectContext'; // Add this import

export default function HomePage() {
  // Replace `currentProject` with `project` and `setProject`
  const [project, setProject] = useState<PreviewProject | null>(null);
  
  const [navigation, setNavigation] = useState<NavigationState>({
    currentUrl: '',
    history: [],
    historyIndex: 0,
    projectId: ''
  });

  const createNewProject = () => {
    console.log("Create New Project Clicked");
    const newProjectId = uuidv4();
    console.log("Generated Project ID:", newProjectId);
    const newProject: PreviewProject = {
      id: newProjectId,
      files: {
        "/App.js": `
import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">New Project ${newProjectId.slice(0, 8)}</h1>
      <p className="mt-2">Start editing to see your changes.</p>
    </div>
  );
}`,
        "/index.html": `
<!DOCTYPE html>
<html>
  <head>
    <title>Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
        "/index.js": `
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`
      }
    };
    
    console.log("Setting Navigation State to:", {
      currentUrl: '',
      history: [],
      historyIndex: 0,
      projectId: newProjectId
    });
    setNavigation({
      currentUrl: '',
      history: [],
      historyIndex: 0,
      projectId: newProjectId
    });
    
    console.log("Setting Current Project to:", newProject);
    setProject(newProject);
  };

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      <div className="flex flex-col h-screen bg-gray-900">
        {/* Project Bar */}
        <div className="h-16 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {project ? `Project: ${project.id.slice(0, 8)}` : "No Active Project"}
            </h2>
            <button
              onClick={createNewProject}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Project
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Panel */}
          <ChatPanel />
          
          {/* Sandpack Preview or Overlay */}
          <div className="flex-1 bg-gray-800 relative">
            {project ? (
              <div className="h-full w-full">
                <SandpackWrapper />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="text-center text-white">
                  <h2 className="text-2xl font-bold">No Project Started</h2>
                  <p className="mt-2">Click "New Project" to get started.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProjectContext.Provider>
  );
}
