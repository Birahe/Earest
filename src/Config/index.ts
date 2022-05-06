import { Config } from "./../Interfaces/Config";
import { config as _config } from "dotenv";
_config();

const config: Config = {
  token: process.env.TOKEN!,
  prefix: process.env.PREFIX!,
  owner: process.env.OWNER!,
  spotify_id: process.env.SPOTIFY_ID!,
  spotify_secret: process.env.SPOTIFY_SECRET!,
  mongo_url: process.env.MONGO_URL!,
  genius_token: process.env.GENIUS_TOKEN!,
};

export default config;
