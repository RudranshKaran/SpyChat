# SpyChat — System Architecture Document

## Self-Destructing Secure Messaging Platform

---

# 1. Introduction

The System Architecture Document describes the overall structure, workflow, modules, and communication flow of the SpyChat platform.

SpyChat is designed as a secure messaging system that integrates cryptographic mechanisms, temporary message storage, device verification, and self-destructing communication workflows.

The architecture focuses on:
- Secure message transmission
- Data confidentiality
- Message integrity
- Controlled access
- Temporary message lifecycle management

---

# 2. System Architecture Overview

SpyChat follows a client-server architecture where users communicate securely through encrypted channels managed by the backend server.

The system consists of:

- Frontend Client
- Backend Server
- Encryption Engine
- Database Layer
- Authentication System
- Self-Destruct Engine
- Device Verification System

---

# 3. High-Level Architecture

```text
+-------------------+
|   User Device A   |
+-------------------+
          |
          v
+-------------------+
|  Frontend Client  |
| (React / HTML JS) |
+-------------------+
          |
          v
+-------------------+
|   Backend Server  |
| (Flask/FastAPI)   |
+-------------------+
     |        |
     |        |
     v        v
+---------+  +------------------+
| AES-256 |  | SHA-256 Integrity|
| Engine  |  | Verification     |
+---------+  +------------------+
     |
     v
+-------------------+
| Database Layer    |
| SQLite / MongoDB  |
+-------------------+
     |
     v
+-------------------+
| Self-Destruct     |
| Message Engine    |
+-------------------+
````

---

# 4. Architecture Components

---

## 4.1 Frontend Client

The frontend provides the user interface for communication and interaction.

### Responsibilities

* User login and registration
* Message sending and receiving
* Chat interface rendering
* Secure session handling
* Screenshot detection simulation
* Displaying encryption and security status

### Technologies

* HTML5
* CSS3
* JavaScript
* React.js (Optional)

---

## 4.2 Backend Server

The backend acts as the central controller of the system.

### Responsibilities

* API handling
* User authentication
* Message routing
* Encryption/decryption coordination
* Device verification
* Session management
* Self-destruct execution

### Technologies

* Python
* Flask / FastAPI

---

## 4.3 Encryption Engine

The Encryption Engine ensures message confidentiality.

### Responsibilities

* Encrypting plaintext messages
* Decrypting received messages
* Generating encryption keys
* Managing secure communication flow

### Algorithm Used

* AES-256 Symmetric Encryption

### Workflow

```text
Plaintext Message
        |
        v
AES Encryption
        |
        v
Encrypted Ciphertext
```

---

## 4.4 Integrity Verification Module

Ensures that messages are not modified during transmission or storage.

### Responsibilities

* Generate message hashes
* Compare stored and received hashes
* Detect message tampering

### Algorithm Used

* SHA-256 Hashing

### Workflow

```text
Message
   |
   v
SHA-256 Hash Generation
   |
   v
Stored Hash
```

During retrieval:

```text
Retrieved Message
        |
        v
Generate New Hash
        |
        v
Compare Hashes
```

---

## 4.5 Authentication Module

Handles user identity verification and session authorization.

### Responsibilities

* User registration
* Password hashing
* Login validation
* JWT token generation
* Session verification

### Security Features

* Password hashing
* Secure session tokens
* Protected API routes

---

## 4.6 Device Verification Module

Associates accounts with trusted devices.

### Responsibilities

* Capture browser/device fingerprint
* Detect unknown devices
* Trigger suspicious login alerts

### Parameters Used

* Browser type
* OS information
* Screen resolution
* Device fingerprint hash

---

## 4.7 Message Management Module

Handles message lifecycle management.

### Responsibilities

* Store encrypted messages
* Deliver messages to receiver
* Track viewed status
* Trigger message deletion

### Message States

* Sent
* Delivered
* Viewed
* Destroyed

---

## 4.8 Self-Destruct Engine

Automatically removes messages after access or expiration.

### Responsibilities

* Monitor message timers
* Detect one-time view completion
* Permanently delete expired messages

### Destruction Conditions

* Message viewed once
* Expiration timer exceeded
* Session timeout

---

# 5. System Workflow

---

# 5.1 User Authentication Flow

```text
User Login Request
        |
        v
Authentication Module
        |
        v
Credential Validation
        |
        v
JWT Session Token Generated
        |
        v
Access Granted
```

---

# 5.2 Secure Messaging Flow

```text
Sender Types Message
        |
        v
AES Encryption
        |
        v
SHA-256 Hash Generated
        |
        v
Encrypted Message Stored
        |
        v
Receiver Opens Message
        |
        v
Integrity Verification
        |
        v
Message Decryption
        |
        v
Message Displayed
        |
        v
Self-Destruct Triggered
```

---

# 5.3 Self-Destruct Workflow

```text
Message Viewed
      |
      v
Destruction Condition Checked
      |
      v
Delete Message from Database
      |
      v
Message Permanently Removed
```

---

# 6. Data Flow Diagram (DFD)

## Level 0 DFD

```text
+--------+         +----------------+         +----------+
| Sender | ------> | SpyChat System | ------> | Receiver |
+--------+         +----------------+         +----------+
```

---

## Level 1 DFD

```text
+--------+
| Sender |
+--------+
     |
     v
+----------------------+
| Authentication Module|
+----------------------+
     |
     v
+----------------------+
| Encryption Module    |
+----------------------+
     |
     v
+----------------------+
| Message Database     |
+----------------------+
     |
     v
+----------------------+
| Decryption Module    |
+----------------------+
     |
     v
+----------+
| Receiver |
+----------+
```

---

# 7. Database Architecture

The database stores encrypted messages and user-related information.

---

## User Collection/Table

| Field Name    | Description                   |
| ------------- | ----------------------------- |
| user_id       | Unique user identifier        |
| username      | Username                      |
| password_hash | Hashed password               |
| device_id     | Registered device fingerprint |
| created_at    | Account creation timestamp    |

---

## Message Collection/Table

| Field Name        | Description               |
| ----------------- | ------------------------- |
| message_id        | Unique message identifier |
| sender_id         | Sender user ID            |
| receiver_id       | Receiver user ID          |
| encrypted_message | AES encrypted content     |
| hash_value        | SHA-256 hash              |
| viewed_status     | Message viewed state      |
| expiry_time       | Self-destruct timestamp   |
| created_at        | Message timestamp         |

---

# 8. Security Architecture

SpyChat implements multiple layers of security.

---

## Security Layers

### Layer 1 — Authentication

* JWT-based sessions
* Password hashing

### Layer 2 — Encryption

* AES-256 message encryption

### Layer 3 — Integrity Verification

* SHA-256 hashing

### Layer 4 — Device Verification

* Device fingerprint matching

### Layer 5 — Message Destruction

* Temporary message lifecycle

---

# 9. Non-Functional Requirements

---

## Performance

* Fast message encryption/decryption
* Low latency communication

---

## Scalability

* Modular backend structure
* Expandable database architecture

---

## Reliability

* Secure message handling
* Consistent self-destruct execution

---

## Security

* Encrypted communication
* Tamper detection
* Controlled message access

---

# 10. Advantages of the Architecture

* Modular system design
* Easy maintenance
* Secure communication workflow
* Improved privacy protection
* Temporary data retention
* Scalable implementation structure

---

# 11. Limitations

* Screenshot detection is simulated
* No real end-to-end peer encryption in initial version
* Dependent on server-side message management
* Browser-based device fingerprinting has limitations

---

# 12. Future Architectural Enhancements

Future improvements may include:

* Full end-to-end encryption
* WebSocket real-time communication
* Blockchain-based integrity storage
* Decentralized message routing
* AI-based threat analysis
* Mobile platform support

---

# 13. Conclusion

The SpyChat architecture is designed to demonstrate practical implementation of cryptography and network security principles in secure communication systems.

The modular architecture integrates authentication, encryption, integrity verification, temporary message handling, and device verification to create a privacy-focused messaging platform.

The system serves as an educational prototype for secure communication applications while maintaining scalability and extensibility for future improvements.