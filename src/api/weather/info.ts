import { Router } from "express";
import axios from 'axios';
import { getIpInfo } from "../../utils/user";
import { getClientIp } from "../../utils/basic";
import { digestError } from "../../service/logger";
import { auth } from "../../service/user";
const router = Router();


/**
 * @swagger
 * /api/weather/info:
 *   get:
 *     summary: If the user is authenticated, get the weather information of the user's location. If not, get the weather information of the user's IP address.
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         description: Latitude of the user's location
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         description: Longitude of the user's location
 *     responses:
 *       200:
 *         description: The weather information of the authenticated user's location.
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

router.get('/weather/info', auth, async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    let weatherApiUrl = "";
    let location: IpInfo | null = null;

    if (lat && lon) {
      weatherApiUrl = `${process.env.WEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    } else {
      location = await getIpInfo(getClientIp(req));
      if (!location) throw new Error('Location not found');
      weatherApiUrl = `${process.env.WEATHER_BASE_URL}/data/2.5/weather?q=${location?.city},${location?.country}&appid=${apiKey}`;
    }

    const weatherData = (await axios.get(weatherApiUrl)).data;

    return res.json({
      message: "Weather information of the authenticated user's location.",
      data: {
        ...location,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
        icon: `${process.env.WEATHER_BASE_URL}/img/wn/${weatherData.weather[0].icon}.png`,
        all: weatherData
      }
    });

  } catch (error: any) {
    await digestError('Error fetching weather data', error);
    return res.json({ error: 'Error fetching weather data' });
  }
});

export default router;