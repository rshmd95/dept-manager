import {NextRequest} from 'next/server';

export async function parseBody<T>(request: NextRequest): Promise<T> {
  return (await request.json()) as T;
}
