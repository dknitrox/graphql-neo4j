/**
 *  Default database configuration file
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 *
 *  docs: https://github.com/biggora/caminte/wiki/Connecting-to-DB#connecting
 **/

module.exports.production = {
    driver     : 'neo4j',
    host       : 'localhost',
    port       : '7474',
    username   : 'test',
    password   : 'test',
    database   : 'test',
    autoReconnect : true
};

module.exports.development = {
    driver     : 'neo4j',
    host       : 'localhost',
    port       : '7474',
    username   : 'neo4j',
    password   : 'neo4j1',
    database   : 'test',
    autoReconnect : true
};

module.exports.test = {
    driver     : 'neo4j',
    host       : 'localhost',
    port       : '7474',
    username   : 'test',
    password   : 'test',
    database   : 'test',
    autoReconnect : true
};

module.exports.dev = module.exports.development;