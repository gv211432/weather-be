import { Router, Request, Response } from 'express';
const router = Router();


/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [User Logout]
 *     responses:
 *       200:
 *         description: Logs out the user.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             error:
 *               type: string
 */

router.post('/user/logout', (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.json({ error: 'Logout failed.' });
    }
    return res.json({ message: 'Logout successful!' });
  });
});

export default router;