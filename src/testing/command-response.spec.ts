import { CommandError } from "../lib/CommandError"

describe ('command errors', () => {
    it('', () => {
        try {
            throw new CommandError('some error', 'error code');
        } catch(err) {
            console.log(err);
        }
    })
})