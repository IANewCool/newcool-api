import { NextResponse } from 'next/server';

const startTime = Date.now();

export async function GET() {
  const uptime = Math.floor((Date.now() - startTime) / 1000);

  return NextResponse.json({
    status: 'healthy',
    service: 'newcool-api',
    version: '1.0.0',
    uptime: `${uptime}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
}
