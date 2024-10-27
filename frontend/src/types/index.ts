export interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface NavigationState {
  currentUrl: string;
  history: string[];
  historyIndex: number;
  projectId: string;
}

export interface PreviewProject {
  id: string;
  files: Record<string, string>;
}

export interface LayoutState {
  layout: "preview" | "editor";
  showPreview: boolean;
  showEditor: boolean;
}
