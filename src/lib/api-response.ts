import { NextResponse } from 'next/server';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
  };
}

export function success<T>(data: T, meta?: ApiResponse['meta']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, meta });
}

export function error(message: string, status: number = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function unauthorized(message: string = 'No autorizado'): NextResponse<ApiResponse> {
  return error(message, 401);
}

export function forbidden(message: string = 'Acceso denegado'): NextResponse<ApiResponse> {
  return error(message, 403);
}

export function notFound(message: string = 'No encontrado'): NextResponse<ApiResponse> {
  return error(message, 404);
}

export function serverError(message: string = 'Error interno'): NextResponse<ApiResponse> {
  return error(message, 500);
}
