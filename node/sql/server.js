const http = require('http');
const { URL } = require('url');
const mysql = require('mysql2');

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // 允许跨域

    // 拿到前端传过来的 username 和 password, 并去连接数据库，判断账号密码是否合法
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const username = query.get('username');
    const password = query.get('password');

    if (req.url.startsWith('/login')) {
        // 创建一个数据库连接
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'demo',
        });

        connection.query(`SELECT * FROM user WHERE username="${username}" AND password="${password}"`, (err, results) => {
            if(results.length) {
                res.end(JSON.stringify(results[0]))
            }
        });
    }

})

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})
