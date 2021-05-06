const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
const { auth, requiresAuth } = require('express-openid-connect')

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged Out')
}) // message when logged in

app.get('/profile', requiresAuth(), (req,res) => {
  res.send(JSON.stringify(req.oidc.user))
}) // shows user profile when logged in
