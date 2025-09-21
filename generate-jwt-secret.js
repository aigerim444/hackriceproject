#!/usr/bin/env node

const crypto = require('crypto');

// Generate a secure random string for JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('🔑 Generated JWT Secret for Production:');
console.log('');
console.log(jwtSecret);
console.log('');
console.log('📋 Copy this value for your RENDER environment variable:');
console.log(`JWT_SECRET=${jwtSecret}`);
console.log('');
console.log('⚠️  Keep this secret secure and never commit it to git!');
