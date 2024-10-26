import { z } from "zod";

const CreateProjectArguments = z.object({
  title: z.string(),
});

export const POST = async (request: Request) => {
  const body = CreateProjectArguments.safeParse(await request.json());

  if (!body.success) {
    return Response.json(
      {
        errorMessage: body.error,
      },
      { status: 400 }
    );
  }

  try {
    // Make a request to the GraphQL projects service
    const response = await fetch('http://projects:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation CreateProject($input: CreateProjectInput!) {
            createProject(input: $input) {
              project {
                id
                title
              }
            }
          }
        `,
        variables: {
          input: {
            title: body.data.title,
          },
        },
      }),
    });

    const data = await response.json();
    return Response.json(data.data.createProject);
  } catch (error) {
    return Response.json(
      {
        errorMessage: (error as Error).message,
      },
      { status: 400 }
    );
  }
};
