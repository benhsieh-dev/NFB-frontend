import { environment } from "src/environments/environment";

const OktaOidcIssuer = environment.OktaOidcIssuer; 
const OktaOidcRedirectUri = environment.OktaOidcRedirectUri;
const OktaClientId = environment.OktaClientId

export default {

  // Dynamic environment configurations for localhost and Okta
   oidc: {
    clientId: `${OktaClientId}`,
    issuer: `${OktaOidcIssuer}`,
    redirectUri: `${OktaOidcRedirectUri}`,
    scopes: ['openid', 'profile', 'email'],
  },
};
