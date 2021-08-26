export const environment = {
  production: true,
  // Heroku NFB frontend URL
  baseUrl: 'https://newfullybakery.herokuapp.com',

  // Heroku NFB backend URL
  backEndBaseUrl: 'https://newfullybakery-backend.herokuapp.com',

  // Heroku Okta configurations
  OktaClientId: '0oac1kw4vZ9vG4i0m5d6',
  OktaOidcIssuer: 'https://dev-6013813.okta.com/oauth2/default', 
  OktaOidcRedirectUri: 'https://newfullybakery.herokuapp.com/login/oauth2/code/okta'
};
