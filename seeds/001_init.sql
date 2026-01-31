-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- AUTH PROVIDERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS auth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT unique_provider_user
        UNIQUE (provider, provider_user_id)
);

-- =========================
-- SEED USERS
-- =========================

-- Admin user
INSERT INTO users (email, password_hash, name, role)
VALUES (
    'admin@example.com',
    '$2b$10$CwTycUXWue0Thq9StjUM0uJ8k1sC9n1JpN96CBvs1BgqsSVqS2u6G',
    'Admin User',
    'admin'
);

-- Regular user
INSERT INTO users (email, password_hash, name, role)
VALUES (
    'user@example.com',
    '$2b$10$CwTycUXWue0Thq9StjUM0uJ8k1sC9n1JpN96CBvs1BgqsSVqS2u6G',
    'Regular User',
    'user'
);
