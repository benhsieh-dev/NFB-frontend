export default {
  // localhost Okta credentials
  oidc: {
    clientId: '0oa9tz60nboljykR05d6',
    issuer: 'https://dev-46448354.okta.com/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },

  // Heroku Okta credentials
  // oidc: {
  //   clientId: '0oac1kw4vZ9vG4i0m5d6',
  //   issuer: 'https://dev-6013813.okta.com/oauth2/default',
  //   redirectUri: 'https://newfullybakery.herokuapp.com/login/oauth2/code/okta',
  //   scopes: ['openid', 'profile', 'email'],
  // },
};
