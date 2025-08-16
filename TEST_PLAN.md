# Server Upgrade Test Plan

## Test Commands

### 1. Basic Health Check (existing endpoint)
```bash
curl -i http://localhost:5001/api/health
```

### 2. New Health Check (new endpoint)
```bash
curl -i http://localhost:5001/api/healthz
```

### 3. Verify Security Headers
```bash
curl -i http://localhost:5001/api/health | grep -E "(X-Content-Type-Options|X-DNS-Prefetch-Control|X-Download-Options|X-Frame-Options|X-Permitted-Cross-Domain-Policies|Referrer-Policy|Strict-Transport-Security)"
```

### 4. Test CORS in Development
```bash
curl -i -X OPTIONS -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: GET" http://localhost:5001/api/health
```

### 5. Test Rate Limiting
```bash
# Make rapid requests to trigger rate limiting
for i in {1..105}; do curl -s http://localhost:5001/api/health > /dev/null; done
curl -i http://localhost:5001/api/health
```

### 6. Test Request Size Limit
```bash
curl -i -X POST -H "Content-Type: application/json" -d '{"data":"'$(perl -E 'say "x" x 1048577')'"}' http://localhost:5001/api/health
```

### 7. Test Compression
```bash
curl -H "Accept-Encoding: gzip" http://localhost:5001/api/health
```

### 8. Verify Structured Logging
Check server console output for structured JSON logs with appropriate fields.

### 9. Test Graceful Shutdown
Send SIGTERM to the process and verify it shuts down gracefully within 10 seconds.

## Expected Results

1. `/api/health` returns `{"status":"healthy","timestamp":"..."}` 
2. `/api/healthz` returns `{"status":"ok","uptime":..,"timestamp":"..."}`
3. Security headers are present in responses
4. CORS allows localhost:5173 and localhost:5001 in development
5. Rate limiting returns 429 after 100 requests per minute window
6. Request size limit rejects payloads > 1MB
7. Compression is applied when requested
8. Logs are structured JSON with proper redaction
9. Graceful shutdown completes cleanly
