const config = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_ClIENT_SECRET,
    redirectUri: 'http://localhost:5173/callback',
    audience: 'https://' + process.env.AUTH0_DOMAIN + '/api/v2/',
    scope: 'openid profile email'
};

export default config;