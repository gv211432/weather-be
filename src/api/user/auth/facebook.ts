import { Router } from 'express';
import passport from 'passport';
const router = Router();

/**
 * @swagger
 * /api/user/auth/facebook:
 *   get:
 *     summary: Authenticate with Facebook
 *     description: |
 *      Redirects to Facebook for authentication. Here in swagger docs, it doesn't redirect to Facebook.
 *      Open this link <a href="/api/user/auth/facebook" target="_blank" >Facebook Auth</a> to authenticate with Fackbook.
 * 
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Facebook for authentication.
 */
router.get('/user/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));


/**
 * @swagger
 * /api/user/auth/facebook/callback:
 *   get:
 *     summary: Facebook authentication callback, used by Facebook to redirect back to the application.
 *     tags: [Auth Validation]
 *     responses:
 *       302:
 *         description: |
 *           Redirects based on authentication success or failure.
 *           If successful, redirects to /profile.
 *           If failed, redirects to /login.
 */
router.get('/user/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/api/user/profile',
  failureRedirect: '/api/user/login'
}));

export default router;