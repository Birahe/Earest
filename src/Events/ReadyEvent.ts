import { Event } from "../Interfaces/Events";

const event: Event<"ready"> = {
  name: "ready",
  once: true,
  run(client) {
    client.logger.log(`${client.user!.tag} is ready!`);
    client.registerCommands();
  },
};

export default event;
