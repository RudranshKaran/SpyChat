# SpyChat — Database Design Document

## Self-Destructing Secure Messaging Platform

---

# 1. Introduction

The Database Design Document defines the structure, organization, relationships, and storage mechanisms used in the SpyChat platform.

The database is responsible for securely storing:

- User information
- Authentication data
- Encrypted messages
- Device information
- Session details
- Message lifecycle states

The database architecture is designed to support secure communication, temporary message storage, integrity verification, and scalable message management.

---

# 2. Objectives of Database Design

The database is designed with the following objectives:

- Secure storage of encrypted messages
- Efficient message retrieval
- Temporary message lifecycle management
- Secure user authentication support
- Device verification management
- Message integrity storage
- Scalable architecture for future enhancements

---

# 3. Database Technology

SpyChat can be implemented using either:

---

## Option 1 — SQLite

### Advantages
- Lightweight
- Easy to set up
- Suitable for academic projects
- No separate server required

### Best For
- Local development
- Prototype systems
- Small-scale deployment

---

## Option 2 — MongoDB

### Advantages
- Flexible schema design
- Scalable document-based storage
- Better handling of real-time chat systems

### Best For
- Advanced implementations
- Future scalability
- Real-time messaging systems

---

# 4. Database Architecture Overview

The database consists of the following major entities:

- Users
- Messages
- Sessions
- Device Information
- Activity Logs

---

# 5. Entity Relationship Overview

```text
+-----------+
|   Users   |
+-----------+
      |
      |
      v
+-------------+
|  Messages   |
+-------------+
      |
      |
      v
+-------------+
| ActivityLog |
+-------------+

Users
  |
  v
Sessions

Users
  |
  v
Devices
````

---

# 6. Database Tables / Collections

---

# 6.1 Users Table

Stores user account and authentication information.

---

## Table Name

`users`

---

## Fields

| Field Name     | Data Type      | Description                |
| -------------- | -------------- | -------------------------- |
| user_id        | Integer / UUID | Unique user identifier     |
| username       | VARCHAR        | Unique username            |
| email          | VARCHAR        | User email address         |
| password_hash  | TEXT           | Hashed user password       |
| created_at     | DATETIME       | Account creation timestamp |
| last_login     | DATETIME       | Last login timestamp       |
| account_status | VARCHAR        | Active/Blocked status      |

---

## Purpose

* User authentication
* User identification
* Session association

---

# 6.2 Messages Table

Stores encrypted messages and message lifecycle information.

---

## Table Name

`messages`

---

## Fields

| Field Name         | Data Type      | Description                     |
| ------------------ | -------------- | ------------------------------- |
| message_id         | Integer / UUID | Unique message identifier       |
| sender_id          | Integer / UUID | Sender user ID                  |
| receiver_id        | Integer / UUID | Receiver user ID                |
| encrypted_message  | TEXT           | AES encrypted message           |
| hash_value         | TEXT           | SHA-256 hash                    |
| viewed_status      | BOOLEAN        | Whether message has been viewed |
| self_destruct_time | DATETIME       | Expiration timestamp            |
| created_at         | DATETIME       | Message creation timestamp      |
| destroyed_at       | DATETIME       | Message deletion timestamp      |
| message_status     | VARCHAR        | Sent/Viewed/Destroyed           |

---

## Purpose

* Secure message storage
* Message lifecycle management
* Integrity verification

---

# 6.3 Sessions Table

Stores user session and authentication token information.

---

## Table Name

`sessions`

---

## Fields

| Field Name     | Data Type      | Description                   |
| -------------- | -------------- | ----------------------------- |
| session_id     | Integer / UUID | Unique session identifier     |
| user_id        | Integer / UUID | Associated user ID            |
| jwt_token      | TEXT           | JWT authentication token      |
| login_time     | DATETIME       | Session start time            |
| expiry_time    | DATETIME       | Session expiration            |
| device_id      | VARCHAR        | Associated device fingerprint |
| ip_address     | VARCHAR        | User IP address               |
| session_status | VARCHAR        | Active/Expired                |

---

## Purpose

* Session management
* Authentication verification
* Suspicious login detection

---

# 6.4 Devices Table

Stores trusted device information for device verification.

---

## Table Name

`devices`

---

## Fields

| Field Name        | Data Type      | Description                 |
| ----------------- | -------------- | --------------------------- |
| device_id         | VARCHAR        | Unique device fingerprint   |
| user_id           | Integer / UUID | Associated user ID          |
| browser_name      | VARCHAR        | Browser information         |
| operating_system  | VARCHAR        | OS information              |
| screen_resolution | VARCHAR        | Screen dimensions           |
| first_detected    | DATETIME       | Initial detection timestamp |
| last_used         | DATETIME       | Last usage timestamp        |
| device_status     | VARCHAR        | Trusted/Suspicious          |

---

## Purpose

* Device verification
* Suspicious activity detection
* Trusted device management

---

# 6.5 Activity Logs Table

Stores system events and suspicious activity records.

---

## Table Name

`activity_logs`

---

## Fields

| Field Name           | Data Type      | Description           |
| -------------------- | -------------- | --------------------- |
| log_id               | Integer / UUID | Unique log identifier |
| user_id              | Integer / UUID | Associated user       |
| activity_type        | VARCHAR        | Type of activity      |
| activity_description | TEXT           | Activity details      |
| timestamp            | DATETIME       | Event timestamp       |
| risk_level           | VARCHAR        | Low/Medium/High       |

---

## Examples of Logged Activities

* Failed login attempts
* Unknown device access
* Message viewed
* Message destroyed
* Screenshot detection simulation
* Session expiration

---

# 7. Entity Relationships

---

# 7.1 User → Messages Relationship

```text
One User
   |
   +-------> Many Messages
```

A user can:

* send multiple messages
* receive multiple messages

---

# 7.2 User → Sessions Relationship

```text
One User
   |
   +-------> Multiple Sessions
```

A user may:

* log in from multiple sessions
* have active/inactive sessions

---

# 7.3 User → Devices Relationship

```text
One User
   |
   +-------> Multiple Devices
```

A user may:

* use multiple devices
* register trusted devices

---

# 7.4 User → Activity Logs Relationship

```text
One User
   |
   +-------> Multiple Activity Logs
```

All important activities are tracked for monitoring purposes.

---

# 8. Database Workflow

---

# 8.1 User Registration Workflow

```text id="d7o8im"
User Registration
        |
        v
Password Hashing
        |
        v
Store User Record
```

---

# 8.2 Secure Messaging Workflow

```text id="sy0tms"
Sender Sends Message
        |
        v
AES Encryption Applied
        |
        v
SHA-256 Hash Generated
        |
        v
Store Encrypted Message
```

---

# 8.3 Message Retrieval Workflow

```text id="7df6pm"
Receiver Requests Message
        |
        v
Retrieve Encrypted Message
        |
        v
Verify SHA-256 Hash
        |
        v
Decrypt Message
        |
        v
Display Message
        |
        v
Trigger Self-Destruction
```

---

# 8.4 Self-Destruction Workflow

```text id="h7zafg"
Message Viewed
      |
      v
Check Destruction Conditions
      |
      v
Delete Message Record
      |
      v
Update Message Status
```

---

# 9. Security Measures in Database Design

---

# 9.1 Password Protection

Passwords are never stored as plaintext.

### Implementation

* Password hashing
* Secure authentication storage

---

# 9.2 Encrypted Message Storage

Messages are stored only after AES encryption.

### Benefit

Even database compromise cannot directly expose plaintext messages.

---

# 9.3 Integrity Verification

SHA-256 hashes are stored separately.

### Purpose

Detect unauthorized modification of messages.

---

# 9.4 Session Security

JWT tokens and session expiry information are securely managed.

---

# 9.5 Temporary Data Retention

Self-destructed messages are permanently removed from storage.

---

# 10. Database Constraints

---

## Users Table

* Username must be unique
* Email must be unique

---

## Messages Table

* Sender and receiver must exist
* Message expiry must be valid

---

## Sessions Table

* Session tokens must be unique

---

# 11. Indexing Strategy

Indexes may be applied on:

| Field       | Purpose                    |
| ----------- | -------------------------- |
| username    | Faster login lookup        |
| sender_id   | Faster message retrieval   |
| receiver_id | Faster inbox loading       |
| session_id  | Faster session validation  |
| device_id   | Faster device verification |

---

# 12. Scalability Considerations

Future scalability improvements may include:

* Real-time database synchronization
* Distributed database systems
* Cloud-hosted storage
* Message queue systems
* Database sharding
* Caching mechanisms

---

# 13. Backup and Recovery

Potential future implementations:

* Automated backups
* Secure encrypted backups
* Recovery checkpoints
* Disaster recovery mechanisms

---

# 14. Limitations

* Initial implementation uses centralized storage
* Temporary messages depend on backend deletion
* No distributed storage support in initial version

---

# 15. Future Enhancements

Future improvements may include:

* Blockchain-based message logs
* End-to-end encrypted storage
* Secure distributed databases
* Zero-knowledge storage systems
* Peer-to-peer message synchronization

---

# 16. Conclusion

The SpyChat database architecture is designed to securely manage users, encrypted messages, authentication sessions, device verification, and temporary communication workflows.

The database structure supports the core principles of confidentiality, integrity, authentication, and temporary data retention while maintaining scalability and modularity for future improvements.

The design successfully demonstrates practical implementation of secure data storage concepts in cryptography and network security systems.