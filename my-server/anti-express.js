const http = require('http');

const PORT = 3000;

let users = [
    { id: 1, name: "grace", Task: "wash dishes" },
    { id: 2, name: "leon", Task: "cook" },
];

const baseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'X-Powered-By': 'Pure Node.js',
};

function sendJSON(res, statusCode, data) {
    const body = JSON.stringify(data);

    const headers = {
        ...baseHeaders,
        'Content-Length': Buffer.byteLength(body),
    };

    res.writeHead(statusCode, headers);
    res.end(body);
}

function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error('Invalid JSON'));
            }
        });
    });
}

function getIdFromUrl(url) {
    const parts = url.split('/');
    return parseInt(parts[2]);
}

function logRequest(req) {
    console.log('─────────────────────────────');
    console.log(`METHOD  : ${req.method}`);
    console.log(`URL     : ${req.url}`);
    console.log(`HEADERS : ${JSON.stringify(req.headers, null, 2)}`);
    console.log('─────────────────────────────');
}

const server = http.createServer(async (req, res) => {
    const method = req.method;
    const url = req.url;

    logRequest(req);

    if (method === 'OPTIONS') {
        res.writeHead(204, {
            ...baseHeaders,
        });
        res.end();
        return;
    }

    if (method === 'HEAD' && url === '/users') {
        const body = JSON.stringify(users);

        const headers = {
            ...baseHeaders,
            'Content-Length': Buffer.byteLength(body),
            'X-Total-Count': users.length,
        };

        res.writeHead(200, headers);
        res.end();
        return;
    }

    if (method === 'HEAD' && url.startsWith('/users/')) {
        const id = getIdFromUrl(url);
        const user = users.find(u => u.id === id);

        if (!user) {
            res.writeHead(404, baseHeaders);
            res.end();
            return;
        }

        const body = JSON.stringify(user);

        const headers = {
            ...baseHeaders,
            'Content-Length': Buffer.byteLength(body),
        };

        res.writeHead(200, headers);
        res.end();
        return;
    }

    if (method === 'GET' && url === '/users') {
        sendJSON(res, 200, users);
        return;
    }

    if (method === 'GET' && url.startsWith('/users/')) {
        const id = getIdFromUrl(url);
        const user = users.find(u => u.id === id);

        if (!user) {
            sendJSON(res, 404, { message: "Nobody with that id" });
            return;
        }

        sendJSON(res, 200, user);
        return;
    }

    if (method === 'POST' && url === '/users') {
        try {
            const body = await getBody(req);
            const { name, Task } = body;

            if (!name || !Task) {
                sendJSON(res, 400, { message: "Name and Task are required" });
                return;
            }

            const newUser = {
                id: users.length + 1,
                name,
                Task,
            };

            users.push(newUser);
            sendJSON(res, 201, newUser);
        } catch {
            sendJSON(res, 400, { message: "Invalid JSON in body" });
        }

        return;
    }

    if (method === 'PUT' && url.startsWith('/users/')) {
        try {
            const id = getIdFromUrl(url);
            const index = users.findIndex(u => u.id === id);

            if (index === -1) {
                sendJSON(res, 404, { message: "User not found" });
                return;
            }

            const body = await getBody(req);
            const { name, Task } = body;

            users[index] = {
                id,
                name,
                Task,
            };

            sendJSON(res, 200, users[index]);
        } catch {
            sendJSON(res, 400, { message: "Invalid JSON in body" });
        }

        return;
    }

    if (method === 'PATCH' && url.startsWith('/users/')) {
        try {
            const id = getIdFromUrl(url);
            const user = users.find(u => u.id === id);

            if (!user) {
                sendJSON(res, 404, { message: "User not found" });
                return;
            }

            const body = await getBody(req);

            if (body.name) user.name = body.name;
            if (body.Task) user.Task = body.Task;

            sendJSON(res, 200, user);
        } catch {
            sendJSON(res, 400, { message: "Invalid JSON in body" });
        }

        return;
    }

    if (method === 'DELETE' && url.startsWith('/users/')) {
        const id = getIdFromUrl(url);
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            sendJSON(res, 404, { message: "User not found" });
            return;
        }

        users.splice(index, 1);
        sendJSON(res, 200, { message: "User deleted" });
        return;
    }

    sendJSON(res, 404, { message: "Route not found" });
});

server.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`);
});