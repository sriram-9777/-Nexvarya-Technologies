import { createHash, timingSafeEqual } from 'node:crypto';

// These endpoints serve the public directory and contact form. Management
// endpoints require a server-configured key until user-session auth is added.
import { verifyFirebaseToken, firebaseAdminConfigured } from './firebaseAdmin.js';

export function apiAccess(managementKey) {
  return (req, res, next) => {
    const authorization = req.headers.authorization || '';
    const supplied = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    const validKey = managementKey && supplied && timingSafeEqual(
      createHash('sha256').update(managementKey).digest(),
      createHash('sha256').update(supplied).digest(),
    );
    req.isManagement = Boolean(validKey);
    const publicRead = req.method === 'GET' && ['/api/health', '/api/shops', '/api/products'].includes(req.path);
    const publicInquiry = req.method === 'POST' && req.path === '/api/enquiries';
    if (publicRead || publicInquiry || req.isManagement) return next();
    if (!firebaseAdminConfigured) return res.status(managementKey ? 401 : 503).json({ error: managementKey ? 'Authentication required.' : 'Management API is not configured.' });
    if (authorization.startsWith('Bearer ')) {
      verifyFirebaseToken(supplied).then((firebaseToken) => {
        const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
        const isVerifiedAdmin = firebaseToken?.email_verified && adminEmail && firebaseToken.email?.toLowerCase() === adminEmail;
        if (isVerifiedAdmin) { req.isManagement = true; return next(); }
        return res.status(managementKey ? 401 : 503).json({ error: managementKey ? 'Authentication required.' : 'Management API is not configured.' });
      });
      return;
    }
    return res.status(managementKey ? 401 : 503).json({ error: managementKey ? 'Authentication required.' : 'Management API is not configured.' });
  };
}
