"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
exports.default = {
    dbName: constants_1.___DB_NAME___,
    user: constants_1.___DB_USER___,
    password: constants_1.___DB_PASSWORD___,
    debug: constants_1.___PROD___,
    type: constants_1.___DB_TYPE___,
    entities: [Post_1.Post],
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
        transactional: true,
        disableForeignKeys: true,
        allOrNothing: true,
        dropTables: true,
        safe: false,
    },
};
//# sourceMappingURL=mikro-orm.config.js.map