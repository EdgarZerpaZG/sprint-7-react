import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';

describe('Request Earth Polychromatic Imaging Camera', () => {
  let response: Response;
  let body: Array<{ [key: string]: unknown }>;

  beforeAll(async () => {
    response = await fetch(import.meta.env.VITE_API_URL,);
    body = await response.json();
  });

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });

  test('Should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json');
  });

  test('Should have array in the body', () => {
    expectTypeOf(body).toBeArray();
  });
});