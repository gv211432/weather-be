import { Router, Request, Response } from 'express';
import passport from 'passport';
import { filterUser } from '../../utils/user';
const router = Router();

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User Login]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to log in.
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *              type: string
 *              description: User's email
 *             password:
 *              type: string
 *              description: User's password
 * 
 *     responses:
 *       200:
 *         description: |
 *            {
 *              "message": "Login successful",
 *              "data" ?: [],
 *              "errors" ?: []  
 *            }
 */

router.post('/user/login', (req: Request, res: Response, next) => {
  passport.authenticate('local', (err: any, user: any, info: any, status: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful', data: filterUser(user) });
    });
  })(req, res, next);
});

export default router;
