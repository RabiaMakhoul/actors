
const PREVIEW_MANAGER_URL = process.env.NEXT_PUBLIC_PREVIEW_MANAGER_URL || 'http://preview-manager:3001';

export async function createProject() {
  const response = await fetch(`${PREVIEW_MANAGER_URL}/api/projects/create`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
}

export async function cleanupProject(projectId: string) {
  await fetch(`${PREVIEW_MANAGER_URL}/api/projects/${projectId}/cleanup`, {
    method: 'POST',
  });
}
