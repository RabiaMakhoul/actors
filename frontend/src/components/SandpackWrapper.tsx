import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import styles from "./SandpackWrapper.module.css";
import React from "react";

interface SandpackWrapperProps {
  files: Record<string, string>;
}

export default function SandpackWrapper({ files }: SandpackWrapperProps) {
  // Add necessary configuration files for Next.js
  const sandpackFiles = {
    ...files,
    // Add package.json with required dependencies
    "/package.json": JSON.stringify({
      name: "nextjs-preview",
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        "next": "^14.0.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      }
    }),
    // Add tsconfig.json
    "/tsconfig.json": JSON.stringify({
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }]
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"]
    }),
    // Add global CSS file
    "/src/app/globals.css": `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `,
  };

  return (
    <div className={styles.wrapper}>
      <SandpackProvider 
        template="nextjs"
        files={sandpackFiles}
        customSetup={{
          dependencies: {
            "next": "^14.0.0",
            "react": "^18.2.0",
            "react-dom": "^18.2.0",
            "tailwindcss": "^3.3.0",
          }
        }}
      >
        <SandpackPreview 
          className={styles.fullScreenPreview}
          showNavigator={false}
          showRefreshButton={false}
        />
      </SandpackProvider>
    </div>
  );
}
