// These endpoints serve the public directory and contact form. Protected
// endpoints require a verified Firebase admin session. No shared API key is used.
import { verifyFirebaseToken, firebaseAdminConfigured } from './firebaseAdmin.js';

export function apiAccess() {
  return (req, res, next) => {
    const authorization = req.headers.authorization || '';
    const supplied = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    req.isManagement = false;
    const publicRead = req.method === 'GET' && ['/api/health', '/api/shops', '/api/products'].includes(req.path);
    const publicInquiry = req.method === 'POST' && req.path === '/api/enquiries';
    if (publicRead || publicInquiry) return next();
    if (!firebaseAdminConfigured) return res.status(503).json({ error: 'Firebase admin authentication is not configured.' });
    if (authorization.startsWith('Bearer ')) {
      verifyFirebaseToken(supplied).then((firebaseToken) => {
        const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
        const isVerifiedAdmin = firebaseToken?.email_verified && adminEmail && firebaseToken.email?.toLowerCase() === adminEmail;
        if (isVerifiedAdmin) { req.isManagement = true; return next(); }
        return res.status(401).json({ error: 'Admin authentication required.' });
      });
      return;
    }
    return res.status(401).json({ error: 'Admin authentication required.' });
  };
}
