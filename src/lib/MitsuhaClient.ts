// @ts-nocheck

import * as config from "#root/config";
import { Client, Message, version } from "discord.js";
import { Command } from "./interfaces/Command";
import { commands, commandMap } from "./handlers/command";
import { execCommand } from "./utils/execCommand";
import { totalmem } from "os";
import { updateStats } from "./utils/updateClientStats";

export interface MitsuhaClient extends Client {
  type: string;
  commands: any;
  commandMap: any[];
  config: any;
}

export const __MitsuhaClient__ = (client: Client) => {
  const _ = client as MitsuhaClient;

  _.type = "MitsuhaClient";

  _.commands = commands;

  _.commandMap = commandMap;

  _.config = config;

  return _;
};