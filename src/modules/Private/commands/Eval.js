const nodeUtil = require('util');
const config = require('../../../../configs/config.json');

const {
    Command,
    CommandPermissions,
    CommandOptions,
} = require('axoncore');

class Eval extends Command {
    constructor(module) {
        super(module);

        this.label = 'eval';

        this.info = {
            description: 'Evaluate JavaScript code.',
            usage: 'eval [code]',
            examples: ['eval 1+1'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
        } );

        this.permissions = new CommandPermissions(this, {
            staff: {
                needed: this.axon.staff.owners,
            },
        } );
    }

    /**
     * @param {import('axoncore').CommandEnvironment} env
     */
    async execute(env) {
        const { msg, args, guildConfig } = env;
        let evalString;
        let noOutput;
        try {
            // eslint-disable-next-line no-eval
            evalString = args.join(' ');
            if (evalString.includes('--no-output')) {
                noOutput = true;
                evalString = evalString.replace('--no-output', '');
            }
            evalString = await eval(evalString);

            if (typeof evalString === 'object') {
                evalString = nodeUtil.inspect(evalString, { depth: 0, showHidden: true });
            } else {
                evalString = String(evalString);
            }
        } catch (err) {
            this.logger.debug(err.stack);
            return this.utils.sendError(msg.channel, err.message ? err.message : `Error: ${err}`);
        }

        evalString = evalString.replace(new RegExp(this.bot.token, 'g'), '[REDACTED TOKEN]');

        if (evalString.length === 0) {
            return this.utils.sendError(msg.channel, 'Nothing to evaluate.');
        }

        const splitEvaled = evalString.match(/[\s\S]{1,1900}[\n\r]/g) || [evalString];
        
        if (splitEvaled.length > 3) {
            this.sendMessage(msg.channel, `Cut the response! [3/${splitEvaled.length} | ${evalString.length} chars]`);
        }
        
        if (!noOutput) {
            for (let i = 0; i < 3; i++) {
                if (!splitEvaled[i]) {
                    break;
                }
                this.utils.sendBasic(msg, `**Output${i > 1 ? ` ${i}` : ''}**:\n\`\`\`js\n${splitEvaled[i]}\n\`\`\``);
            }
        }
        
    }
}

module.exports = Eval;
