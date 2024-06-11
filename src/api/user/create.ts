import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
const router = Router();

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User Register]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *              type: string
 *              description: Any user id
 *             email:
 *              type: string
 *              description: Any user email
 *             password:
 *              type: string
 *              description: Any user password
 * 
 *     responses:
 *       200:
 *         description: |
 *            {
 *              "message": "User registered successfully",
 *              "data" ?: [],
 *              "error" ?: []  
 *            }
 */

router.post('/user/create', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: 'User registered successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

export default router;
