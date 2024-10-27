import { 
  SandpackProvider, 
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import styles from "./SandpackWrapper.module.css";
import React, { useState, useEffect } from "react";

// Add more detailed logging and error handling
function SandpackErrorListener() {
  const { listen } = useSandpack();

  useEffect(() => {
    const stopListening = listen((msg) => {
      // Log all messages for debugging
      console.log("Sandpack Message:", msg);

      switch (msg.type) {
        case "compile":
          if ("compilatonError" in msg && msg.compilatonError) {
            console.error("Compilation Error:", msg);
          }
          break;
        case "state":
          console.log("Sandpack State:", JSON.stringify(msg.state, null, 2));
          break;
        case "start":
          console.log("Sandpack Start:", msg);
          break;
      }
    });

    return () => {
      stopListening();
    };
  }, [listen]);

  return null;
}

interface SandpackWrapperProps {
  files: Record<string, string>;
}

export default function SandpackWrapper({ files }: SandpackWrapperProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prev => prev + 1);
    console.log("Received files:", files);
  }, [files]);

  // Ensure all required files exist
  const combinedFiles = {
    "/App.js": files["/App.js"] || `
import React from 'react';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Preview</h1>
      <div className="mt-4">
        Your preview will appear here
      </div>
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
  };

  return (
    <div className={styles.sandpackWrapper}>
      <SandpackProvider 
        key={key}
        template="react"
        theme="dark"
        files={combinedFiles}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          recompileMode: "immediate",
          recompileDelay: 300
          // Removed bundlerURL to use default
        }}
      >
        <SandpackErrorListener />
        <SandpackPreview 
          className={styles.preview}
          showNavigator={false}
          showRefreshButton={true}
        />
      </SandpackProvider>
    </div>
  );
}
