import type { Server } from 'http';
import type { Socket } from 'net';

export function attachShutdown(server: Server, logger: any): void {
  const connections = new Set<Socket>();
  
  // Track connections
  server.on('connection', (conn: Socket) => {
    connections.add(conn);
    conn.on('close', () => {
      connections.delete(conn);
    });
  });

  // Graceful shutdown handler
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}, starting graceful shutdown`);
    
    server.close((err) => {
      if (err) {
        logger.error('Error during server close:', err);
        process.exit(1);
      }
      
      logger.info('Server closed successfully');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    const forceShutdown = setTimeout(() => {
      logger.warn('Forcing shutdown after 10s timeout');
      process.exit(1);
    }, 10000);

    // Destroy all connections
    connections.forEach((conn) => {
      conn.destroy();
    });
    
    // Clear the force shutdown timer if we exit normally
    forceShutdown.unref();
  };

  // Register signal handlers
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}
