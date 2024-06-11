import { Router } from 'express';
import passport from 'passport';
const router = Router();

/**
 * @swagger
 * /api/user/auth/facebook:
 *   get:
 *     summary: Authenticate with Facebook
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
 *     summary: Facebook authentication callback
 *     tags: [Auth]
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