import {auth} from '../enums.js';

class LocalStorageSvc {
  clearAllTokens() {
    auth.forEach((provider) =>
      localStorage.removeItem(`token.provider.${provider}`)
    );
  }

  getToken(provider) {
    return localStorage.getItem(`token.provider.${provider}`);
  }

  setToken(provider, token) {
    localStorage.setItem(`token.provider.${provider}`, token);
  }
}

export const localStorageSvc = new LocalStorageSvc();
