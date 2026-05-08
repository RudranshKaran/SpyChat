# SpyChat Backend

Secure messaging backend for SpyChat. Built with FastAPI, JWT auth, AES-GCM message encryption, and SQLite for storage.

## Features

- User registration and login
- JWT access and refresh tokens
- Secure message encryption with integrity verification
- One-time view and self-destruct messages
- Device verification and session tracking
- Activity logging and security alerts

## Project Structure

```
spychat-backend/
  app/
    api/
    auth/
    core/
    database/
    middleware/
    models/
    schemas/
    services/
    utils/
    main.py
  tests/
  requirements.txt
  .env
```

## Setup

1. Create a virtual environment and install deps:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

2. Configure environment variables in `.env`.

3. Run the server:

```bash
uvicorn app.main:app --reload
```

## Environment Variables

- `APP_ENV`: `development` or `production`
- `DATABASE_URL`: `sqlite:///./spychat.db`
- `JWT_SECRET_KEY`: long random secret
- `JWT_ALGORITHM`: `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
- `REFRESH_TOKEN_EXPIRE_DAYS`: `7`
- `ENCRYPTION_KEY`: base64 32-byte key

## API Base

- Base URL: `http://localhost:8000/api`
- Docs: `http://localhost:8000/docs`

## Security Notes

- Store `.env` securely.
- Rotate `JWT_SECRET_KEY` and `ENCRYPTION_KEY` in production.
- Use HTTPS in production.
