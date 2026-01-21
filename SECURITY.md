# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. Do Not Create Public Issues

Please **DO NOT** create public GitHub issues for security vulnerabilities.

### 2. Contact Us Privately

Send details to: **evra@example.com**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### 3. Response Time

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity

## Security Measures

### Current Security Features

1. **Authentication**
   - Credential-based authentication with NextAuth.js
   - Password hashing with bcrypt (10 salt rounds)
   - Session-based access control
   - JWT tokens for sessions

2. **Authorization**
   - Protected admin routes
   - Server-side authentication checks
   - Middleware protection
   - Role-based access (admin only)

3. **Data Protection**
   - Input validation with Zod schemas
   - SQL injection prevention via Prisma ORM
   - XSS protection via React's built-in escaping
   - CSRF protection (Next.js default)

4. **Database Security**
   - Parameterized queries via Prisma
   - Environment-based credentials
   - No credentials in source code
   - Connection pooling

5. **Environment Variables**
   - Secrets stored in environment variables
   - No sensitive data in version control
   - Example files without real credentials
   - Production secrets separate

### Best Practices

When deploying:

1. **Change Default Credentials**
   ```
   ADMIN_EMAIL: Use a real email
   ADMIN_PASSWORD: Use a strong, unique password
   ```

2. **Generate Secure Secrets**
   ```bash
   openssl rand -base64 32
   ```

3. **Use HTTPS Only**
   - Enforce HTTPS in production
   - Set secure cookies
   - Use HSTS headers

4. **Database Security**
   - Use strong database passwords
   - Enable SSL connections
   - Restrict IP access
   - Regular backups

5. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Apply patches promptly

### Security Checklist for Production

- [ ] Changed default admin password
- [ ] Generated new NEXTAUTH_SECRET
- [ ] Database uses SSL
- [ ] HTTPS enforced
- [ ] Secure headers configured
- [ ] Rate limiting enabled
- [ ] Error messages don't expose sensitive info
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Security updates scheduled

## Known Limitations

1. **Image Upload**: Currently placeholder only. Implement secure upload with:
   - File type validation
   - Size limits
   - Malware scanning
   - Secure storage

2. **Rate Limiting**: Not implemented by default. Add for:
   - Login attempts
   - API endpoints
   - Form submissions

3. **Two-Factor Authentication**: Not implemented. Consider adding for admin accounts.

## Vulnerability Disclosure

We follow responsible disclosure:

1. Researcher reports vulnerability privately
2. We confirm and assess severity
3. We develop and test a fix
4. We release the fix
5. We credit the researcher (if desired)
6. Details disclosed 90 days after fix

## Security Updates

Subscribe to security updates:
- Watch this repository
- Follow @mr_evra on Twitter
- Check CHANGELOG.md

## Questions?

For security questions: evra@example.com

For general questions: Open a GitHub issue

---

**Last Updated**: January 21, 2026
