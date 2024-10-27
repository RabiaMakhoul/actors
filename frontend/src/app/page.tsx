'use client';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ChatPanel } from "../components/ChatPanel";
import { PreviewProject, NavigationState } from "../../src/types/index";
import SandpackWrapper from "../components/SandpackWrapper";

export default function HomePage() {
  const [currentProject, setCurrentProject] = useState<PreviewProject>({
    id: uuidv4(),
    files: {
      "/src/app/page.tsx": `
export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to your new project!</h1>
      <p className="mt-2">Start editing to see your changes.</p>
    </div>
  );
}`,
      "/src/app/layout.tsx": `
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}`,
      "/src/app/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;
`
    }
  });

  const [navigation, setNavigation] = useState<NavigationState>({
    currentUrl: '',
    history: [],
    historyIndex: 0,
    projectId: ''
  });

  const createNewProject = () => {
    setCurrentProject({
      id: uuidv4(),
      files: {
        "/src/app/page.tsx": `
export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">New Project ${uuidv4().slice(0, 8)}</h1>
      <p className="mt-2">Start editing to see your changes.</p>
    </div>
  );
}`,
        "/src/app/layout.tsx": `
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}`,
        "/src/app/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;
`
      }
    });
  };

  const updateProjectFiles = (files: Record<string, string>) => {
    setCurrentProject(prev => ({
      ...prev,
      files: { ...prev.files, ...files }
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Project Bar */}
      <div className="h-16 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Project: {currentProject.id.slice(0, 8)}
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
        <ChatPanel onUpdatePreview={updateProjectFiles} />
        
        {/* Sandpack Preview */}
        <div className="flex-1 bg-gray-800">
          <div className="h-full w-full">
            <SandpackWrapper files={currentProject.files} />
          </div>
        </div>
      </div>
    </div>
  );
}
