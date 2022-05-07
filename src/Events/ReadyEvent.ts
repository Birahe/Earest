import { Event } from "../Interfaces/Events";
import playerEvents from "../Handlers/PlayerEvents";

const event: Event<"ready"> = {
  name: "ready",
  once: true,
  run(client) {
    client.logger.log(`${client.user!.tag} is ready!`);
    client.registerCommands();
    playerEvents(client);
  },
};

export default event;
