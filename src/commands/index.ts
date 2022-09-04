import { slashCommand } from "../interfaces/slashCommand";
import { test } from "./test";
import { show } from "./show";
import { showPlayers } from "./showPlayers";

const slashCommands: slashCommand[] = [
    test,
    showPlayers,
    show
];

export default slashCommands;