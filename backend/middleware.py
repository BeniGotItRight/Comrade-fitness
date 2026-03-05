import time
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from collections import defaultdict

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, limit: int = 5, window: int = 60):
        super().__init__(app)
        self.limit = limit
        self.window = window
        self.requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        if request.url.path == "/auth/login":
            client_ip = request.client.host
            now = time.time()
            
            # Clean up old requests
            self.requests[client_ip] = [t for t in self.requests[client_ip] if now - t < self.window]
            
            if len(self.requests[client_ip]) >= self.limit:
                raise HTTPException(status_code=429, detail="Too many login attempts. Please try again later.")
            
            self.requests[client_ip].append(now)
            
        response = await call_next(request)
        return response
