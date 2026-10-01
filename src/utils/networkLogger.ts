/**
 * Network request logger for debugging API calls
 */

import {logger} from './debugUtils';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Enhanced fetch wrapper that logs all network requests in development
 */
export const debugFetch = async (
  url: string,
  options: FetchOptions = {},
): Promise<Response> => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const startTime = performance.now();

  // Log request
  if (__DEV__) {
    logger.display({
      name: '🌐 API REQUEST',
      value: {
        id: requestId,
        method: options.method || 'GET',
        url,
        headers: options.headers,
        body: options.body,
      },
      preview: `${options.method || 'GET'} ${url}`,
    });
  }

  try {
    const response = await fetch(url, options);
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Clone response to read body without consuming it
    const clonedResponse = response.clone();
    let responseBody;
    try {
      responseBody = await clonedResponse.json();
    } catch {
      responseBody = await clonedResponse.text();
    }

    // Log response
    if (__DEV__) {
      logger.display({
        name: response.ok ? '✅ API SUCCESS' : '❌ API ERROR',
        value: {
          id: requestId,
          status: response.status,
          statusText: response.statusText,
          duration: `${duration.toFixed(2)}ms`,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseBody,
        },
        preview: `${response.status} ${url} (${duration.toFixed(0)}ms)`,
      });
    }

    return response;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Log error
    if (__DEV__) {
      logger.error('🚨 API REQUEST FAILED', {
        id: requestId,
        url,
        error: error instanceof Error ? error.message : String(error),
        duration: `${duration.toFixed(2)}ms`,
      });
    }

    throw error;
  }
};

/**
 * Example usage:
 *
 * const response = await debugFetch('https://api.example.com/users', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify({ name: 'John' }),
 * });
 */
