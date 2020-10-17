const Eris = require('eris');
require('dotenv').config();

const { AxonOptions } = require('axoncore');

const Client = require('./Client');

const botConfig = require('../configs/config.json');
const secret = process.env;

const lang = require('../configs/lang.json');

const MazzUtils = require('./Utils');

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: {
        param: 1,
    },
},
secret.webhooks,
{
    utils: MazzUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: null, // custom DB Service
    DBLocation: `${__dirname}/Database/`,

    axonConfig: null,
    guildConfig: null,
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Eris.Client(
    secret.CTOKEN,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: false,
        messageLimit: 100,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
    },
);

const Bot = new Client(
    client,
    axonOptions,
);

module.exports = Bot;
