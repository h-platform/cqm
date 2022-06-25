import { CommandError } from "../lib/CommandError"

try {
    throw new CommandError('some error', 'error code');
} catch(err) {
    console.log(err);
}
