import { 
  SandpackProvider, 
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import styles from "./SandpackWrapper.module.css";
import React, { useContext } from "react";
import { ProjectContext } from "../contexts/ProjectContext";

export default function SandpackWrapper() {
  const projectContext = useContext(ProjectContext);
  const project = projectContext?.project;

  if (!project) {
    return <div>No project loaded</div>;
  }

  const files = {
    "/App.js": project.files["/App.js"] || '',
    "/index.js": project.files["/index.js"] || '',
    "/index.html": project.files["/index.html"] || '',
  };

  return (
    <div className={`${styles.sandpackWrapper} h-full`}>
      <SandpackProvider
        template="react"
        theme="dark"
        files={files}
        customSetup={{
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0"
          },
          entry: "/index.js"
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          recompileMode: "immediate",
          recompileDelay: 300
        }}
      >
        <SandpackLayout className="h-full">
          <SandpackFileExplorer />
          <SandpackCodeEditor 
            showTabs
            showLineNumbers={true}
          />
          <SandpackPreview 
            showNavigator={true}
            showRefreshButton={true}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
