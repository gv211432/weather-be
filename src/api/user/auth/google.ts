import { Router } from 'express';
import passport from 'passport';
import cors from 'cors';
import { corsOptions } from '../../../config/cors';

const router = Router();

/**
 * @swagger
 * /api/user/auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     description: |
 *      Redirects to Google for authentication. Here in swagger docs, it doesn't redirect to Google.
 *      Open this link <a href="/api/user/auth/google" target="_blank" >Google Auth</a> to authenticate with Google.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google for authentication.
 */
router.get('/user/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /api/user/auth/google/callback:
 *   get:
 *     summary: Google authentication callback, used by Google to redirect back to the application.
 *     tags: [Auth Validation]
 *     responses:
 *       302:
 *         description: |
 *           Redirects based on authentication success or failure.
 *           If successful, redirects to /profile.
 *           If failed, redirects to /login.
 */
router.get('/user/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/api/user/profile',
  failureRedirect: '/api/user/login'
}));

export default router;