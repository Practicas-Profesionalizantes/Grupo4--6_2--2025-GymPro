const config = require('./config.json');

const fs = require('fs');
const express = require('express');

const functions = require('./functions/functions');
const auth = require('./functions/auth');

// Database info
const database = {
    host: config.db.host, 
    user: config.db.user, 
    password: config.db.pass,
    database: config.db.db
}

// Routes
const routers = {
    global: { dir: '/api', path: './server/pages/global', router: express.Router()},
    user: { dir: '/api/user', path: './server/pages/user', router: express.Router()},
    admin: { dir: '/api/admin', path: './server/pages/admin', router: express.Router()}
}

// Handlers
const isAuthenticated = async (req, res, next) => {
    let isAuthenticated = auth.isAuthenticated(functions.getCookie(req, 'token'));
    if (isAuthenticated) return next();

    return res.status(401).json({
        error: true,
        code: 'UNAUTHENTICATED',
        message: 'User is not authenticated'
    });
};

routers.user.router.use(isAuthenticated);

const isAllowed = async (req, res, next) => {
    let userData = auth.getUser(functions.getCookie(req, 'token'));
    let isAllowed = auth.isAllowed(userData.group, 'admin');
    if (isAllowed) return next();

    return res.status(401).json({
        error: true,
        code: 'FORBIDDEN',
        message: 'User does not have sufficient permissions'
    });
};

routers.admin.router.use(isAuthenticated, isAllowed);

// Pages loader
function loadPages(path, router) {
    try {
        const files = fs.readdirSync(path);
        for (let x of files) {
            const fullPath = `${path}/${x}`;
            const stat = fs.statSync(fullPath);
            
            if (stat.isFile() && x.endsWith('.js')) {
                const Event = require(fullPath.replace('server/', ''));
                Event(router, database);
            } else if (stat.isDirectory()) {
                loadPages(fullPath, router);
            }
        }
    } catch (error) {
        console.log('loadPages:', error)
    }
}

for (const key in routers) {
    const router = routers[key];
    loadPages(router.path, router.router)
}

//on Exit
process.stdin.resume(); // so the program will not close instantly

async function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log('exitCode', exitCode);
    if (options.exit) { console.log('exit'); process.exit() };
}

// do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

module.exports = routers;