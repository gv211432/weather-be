import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/User';
import { digestError } from '../../service/logger';
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
 *         description: Created user.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             data:
 *               type: object
 *             error:
 *               type: string
 */

router.post('/user/create', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.json({ error: "User already exists" });
    }

    const newUser = await User.create({ name, email, password: hashedPassword });
    if (!newUser) {
      return res.json({ error: "Error registering user" });
    }
    return res.json({ message: 'User registered successfully', data: user });
  } catch (error: any) {
    await digestError("Error registering user", error);
    return res.json({ error: "Error registering user" });
  }
});

export default router;
