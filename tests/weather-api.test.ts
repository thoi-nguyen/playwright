import { test, expect, request } from "@playwright/test";
import weatherData from "../data/weather-locations.json";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_API_URL = process.env.BASE_API_URL;

test.describe("Weather API Tests", () => {
  test("Get weather data by latitude and longitude", async ({ request }) => {
    for (const loc of weatherData.latLon) {
      console.log(
        `Fetching weather data for location: lat=${loc.lat}, lon=${loc.lon}, key=${API_KEY}`
      );
      const res = await request.get(
        `${BASE_API_URL}?lat=${loc.lat}&lon=${loc.lon}&key=${API_KEY}`
      );
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.data).toBeDefined();
      expect(body.data[0].lat).toEqual(loc.lat);
      expect(body.data[0].lon).toEqual(loc.lon);
    }
  });

  test("Get weather data by postal code", async ({ request }) => {
    for (const code of weatherData.postcodes) {
      const res = await request.get(
        `${BASE_API_URL}?postal_code=${code}&country=US&key=${API_KEY}`
      );
      expect(res.status()).toBe(200);
      const body = await res.json();
      expect(body.data).toBeDefined();
    }
  });
});
