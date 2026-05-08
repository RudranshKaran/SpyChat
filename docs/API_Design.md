# SpyChat — API Design Document

## Self-Destructing Secure Messaging Platform

---

# 1. Introduction

The API Design Document defines the structure, endpoints, request-response models, authentication methods, and communication protocols used in the SpyChat platform.

The APIs act as the communication layer between the frontend client and backend server, enabling secure authentication, encrypted messaging, device verification, session management, and message lifecycle handling.

The API architecture follows RESTful principles and is designed to support secure, scalable, and modular communication.

---

# 2. API Architecture Overview

SpyChat APIs are divided into the following modules:

- Authentication APIs
- User Management APIs
- Messaging APIs
- Device Verification APIs
- Session Management APIs
- Activity Monitoring APIs

---

# 3. Base Configuration

---

## Base URL

```text id="o3z5dz"
http://localhost:5000/api
````

---

## API Format

* REST API Architecture
* JSON-based communication
* JWT Authentication

---

## Content Type

```http id="3vm7h7"
Content-Type: application/json
```

---

# 4. Authentication Mechanism

SpyChat uses JWT (JSON Web Token) authentication for secure API access.

---

## Authentication Flow

```text id="zjv1c8"
User Login
     |
     v
Credentials Verified
     |
     v
JWT Token Generated
     |
     v
Token Sent to Client
     |
     v
Client Sends Token in Headers
```

---

## Authorization Header Format

```http id="y1sh0i"
Authorization: Bearer <jwt_token>
```

---

# 5. API Modules

---

# 5.1 Authentication APIs

Handles user registration, login, and logout functionality.

---

# Register User

## Endpoint

```http id="ahmqcr"
POST /auth/register
```

---

## Description

Creates a new user account.

---

## Request Body

```json id="6t1gc0"
{
  "username": "rudransh",
  "email": "rudransh@example.com",
  "password": "securePassword123"
}
```

---

## Success Response

```json id="0xb9ut"
{
  "message": "User registered successfully"
}
```

---

## Failure Response

```json id="5d5jfc"
{
  "error": "Username already exists"
}
```

---

# Login User

## Endpoint

```http id="y4y1dh"
POST /auth/login
```

---

## Description

Authenticates user credentials and generates JWT token.

---

## Request Body

```json id="o0qmdr"
{
  "username": "rudransh",
  "password": "securePassword123"
}
```

---

## Success Response

```json id="v8zphu"
{
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

---

## Failure Response

```json id="bff1c3"
{
  "error": "Invalid credentials"
}
```

---

# Logout User

## Endpoint

```http id="f5t4mz"
POST /auth/logout
```

---

## Description

Terminates user session.

---

## Headers

```http id="jlwmwi"
Authorization: Bearer <jwt_token>
```

---

## Success Response

```json id="7mjlwm"
{
  "message": "Logout successful"
}
```

---

# 5.2 User Management APIs

Handles user profile and account information.

---

# Get User Profile

## Endpoint

```http id="7bq1xp"
GET /users/profile
```

---

## Description

Retrieves logged-in user information.

---

## Headers

```http id="4shhzf"
Authorization: Bearer <jwt_token>
```

---

## Success Response

```json id="p4qqr7"
{
  "user_id": 1,
  "username": "rudransh",
  "email": "rudransh@example.com"
}
```

---

# Update User Profile

## Endpoint

```http id="nm8dhk"
PUT /users/update
```

---

## Request Body

```json id="g0iyq6"
{
  "email": "newemail@example.com"
}
```

---

## Success Response

```json id="jsfe8w"
{
  "message": "Profile updated successfully"
}
```

---

# 5.3 Messaging APIs

Handles encrypted communication between users.

---

# Send Message

## Endpoint

```http id="7v8s0m"
POST /messages/send
```

---

## Description

Encrypts and stores a secure message.

---

## Headers

```http id="n2xpf8"
Authorization: Bearer <jwt_token>
```

---

## Request Body

```json id="b8q2ik"
{
  "receiver_id": 2,
  "message": "Meet at 10 PM",
  "self_destruct_time": "2026-05-08T22:00:00"
}
```

---

## Backend Workflow

```text id="lf42dy"
Receive Message
      |
      v
AES Encryption
      |
      v
SHA-256 Hash Generation
      |
      v
Store Encrypted Message
```

---

## Success Response

```json id="vdrk0t"
{
  "message": "Encrypted message sent successfully"
}
```

---

# Get Messages

## Endpoint

```http id="9r8pfr"
GET /messages/inbox
```

---

## Description

Retrieves encrypted messages for logged-in user.

---

## Headers

```http id="stbmnz"
Authorization: Bearer <jwt_token>
```

---

## Success Response

```json id="4s91oi"
{
  "messages": [
    {
      "message_id": 101,
      "sender": "agentX",
      "encrypted_message": "8d9f7a21bc...",
      "viewed_status": false
    }
  ]
}
```

---

# View Message

## Endpoint

```http id="y9bd1k"
GET /messages/view/<message_id>
```

---

## Description

Decrypts message after integrity verification.

---

## Backend Workflow

```text id="5a8y6m"
Retrieve Encrypted Message
          |
          v
Verify SHA-256 Hash
          |
          v
AES Decryption
          |
          v
Display Plaintext
          |
          v
Trigger Self-Destruct
```

---

## Success Response

```json id="h4zh7l"
{
  "message": "Meet at 10 PM"
}
```

---

## Failure Response

```json id="u6i1h5"
{
  "error": "Integrity verification failed"
}
```

---

# Delete Message

## Endpoint

```http id="jlwmn7"
DELETE /messages/delete/<message_id>
```

---

## Description

Permanently deletes message from database.

---

## Success Response

```json id="2o8q1y"
{
  "message": "Message destroyed successfully"
}
```

---

# 5.4 Device Verification APIs

Handles trusted device management and suspicious login detection.

---

# Verify Device

## Endpoint

```http id="3n7qqz"
POST /devices/verify
```

---

## Request Body

```json id="m0n8ke"
{
  "browser": "Chrome",
  "operating_system": "Windows 11",
  "screen_resolution": "1920x1080"
}
```

---

## Success Response

```json id="8c0yut"
{
  "status": "Trusted Device"
}
```

---

## Failure Response

```json id="g5p5lg"
{
  "status": "Suspicious Device Detected"
}
```

---

# Get Trusted Devices

## Endpoint

```http id="v0u1iv"
GET /devices/list
```

---

## Success Response

```json id="gqgsjw"
{
  "devices": [
    {
      "device_id": "abc123",
      "browser": "Chrome",
      "last_used": "2026-05-08"
    }
  ]
}
```

---

# 5.5 Session Management APIs

Handles active user sessions.

---

# Get Active Sessions

## Endpoint

```http id="jlwmwi"
GET /sessions/active
```

---

## Success Response

```json id="x4mx0z"
{
  "active_sessions": 2
}
```

---

# Terminate Session

## Endpoint

```http id="fyks4k"
DELETE /sessions/terminate/<session_id>
```

---

## Success Response

```json id="86r4rq"
{
  "message": "Session terminated"
}
```

---

# 5.6 Activity Monitoring APIs

Tracks suspicious activity and security-related events.

---

# Get Activity Logs

## Endpoint

```http id="73o7zn"
GET /activity/logs
```

---

## Description

Returns recent activity records.

---

## Success Response

```json id="80sr7r"
{
  "logs": [
    {
      "activity": "Unknown device login attempt",
      "risk_level": "High"
    }
  ]
}
```

---

# 6. API Security Design

---

# Security Features

| Security Layer      | Purpose                    |
| ------------------- | -------------------------- |
| JWT Authentication  | Secure API access          |
| AES Encryption      | Message confidentiality    |
| SHA-256 Hashing     | Integrity verification     |
| HTTPS Support       | Secure communication       |
| Session Expiry      | Reduce unauthorized access |
| Device Verification | Prevent suspicious logins  |

---

# 7. Error Handling

The API follows standardized error responses.

---

## Common Error Format

```json id="o0x3r3"
{
  "error": "Description of error"
}
```

---

## Common HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Resource Not Found    |
| 500  | Internal Server Error |

---

# 8. API Workflow Diagram

```text id="jl5mbx"
Frontend Client
        |
        v
REST API Request
        |
        v
Authentication Verification
        |
        v
Encryption / Processing
        |
        v
Database Interaction
        |
        v
JSON Response Returned
```

---

# 9. Future API Enhancements

Future improvements may include:

* WebSocket real-time messaging
* End-to-end encryption APIs
* Secure file sharing APIs
* Voice/video communication APIs
* Multi-factor authentication APIs
* AI-based threat analysis APIs

---

# 10. Advantages of API Design

* Modular API structure
* Secure communication workflow
* Scalable architecture
* Easy frontend-backend integration
* Real-time expansion capability

---

# 11. Limitations

* Initial version uses REST-based communication only
* Real-time messaging not implemented in first phase
* End-to-end encryption handled server-side initially

---

# 12. Conclusion

The SpyChat API architecture provides a secure and modular communication layer for authentication, encrypted messaging, device verification, and session management.

By integrating RESTful APIs with JWT authentication, AES encryption workflows, SHA-256 integrity verification, and temporary message lifecycle handling, the API system successfully demonstrates practical implementation of secure communication concepts in cryptography and network security applications.