import { createContext } from 'react';
import { PreviewProject } from '../types';

export const ProjectContext = createContext<{
  project: PreviewProject | null;
  setProject: React.Dispatch<React.SetStateAction<PreviewProject | null>>;
} | null>(null);
