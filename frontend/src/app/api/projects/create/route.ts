import { NextResponse } from 'next/server';
import { createProject } from '@/lib/projectManager';

export async function POST() {
  try {
    const { projectId, previewUrl } = await createProject();
    return NextResponse.json({ projectId, previewUrl });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
