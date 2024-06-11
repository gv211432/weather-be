import { Router } from "express";
import { getClientIp } from "../../utils/basic";
import { getIpInfo } from "../../utils/user";
import { digestError } from "../../service/logger";
import { auth } from "../../service/user";
const router = Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Verify Login State]
 *     responses:
 *       200:
 *         description: The authenticated user's profile.
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
router.get('/user/profile', auth, async (req, res) => {
  try {
    console.log({ ip: getClientIp(req) });
    console.log({ info: await getIpInfo(getClientIp(req)) });

    return res.json({ message: 'Authenticated', data: req.user });
  } catch (error: any) {
    await digestError('Error getting user profile', error);
    return res.json({ error: 'Error getting user profile' });
  }
});

export default router;