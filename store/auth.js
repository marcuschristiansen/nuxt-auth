import Auth0Lock from 'auth0-lock';

const lock = new Auth0Lock(
  process.env.AUTH0_CLIENT_ID,
  process.env.AUTH0_CLIENT_DOMAIN, {
    auth: {
      responseType: 'token id_token',
      redirectUrl: `${process.env.baseUrl}/callback`,
      autoParseHash: true
    }
  }
)

export const state = () => ({
  token: false,
  expirationDate: false,
  profile: false,
  signedIn: false
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setExpiration (state, expirationDate) {
    state.expirationDate = expirationDate
  },
  setProfile (state, profile) {
    state.profile = profile
  },
  setStatus (state, status) {
    state.signedIn = status
  },
}

export const getters = {
    getToken (state) {
        return state.token
    },
    getProfile (state) {
        return JSON.parse(state.profile)
    },
    getExpirationDate (state) {
        return state.expirationDate
    },
    getStatus (state) {
        return state.signedIn
    }
}

export const actions = {
    showAuth (context) {
      lock.show()
    },

    handleAuth (context) {
        return new Promise ((resolve, reject) => {
            lock.on('authenticated', (authResult) => {
                console.log(authResult)
                lock.getUserInfo(authResult.accessToken, function (error, profile) {
                if (error) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('tokenExpiration')
                    localStorage.removeItem('profile');
                    localStorage.removeItem('signedIn');
                    reject()
                }

                localStorage.setItem('accessToken', authResult.accessToken);
                localStorage.setItem('tokenExpiration', new Date().getTime() + authResult.expiresIn * 1000)
                localStorage.setItem('profile', JSON.stringify(profile));
                localStorage.setItem('signedIn', true)
                resolve()
                })
            })
        })
        
    },

    initAuth ({ commit }) {
        const token = localStorage.getItem('accessToken')
        const expirationDate = localStorage.getItem('tokenExpiration')
        const profile = localStorage.getItem('profile')
        const status = localStorage.getItem('signedIn')

        // If the token has expired or there is no token
        if(new Date().getTime() > expirationDate || !token) {
            return;
        }

        commit('setToken', token)
        commit('setExpiration', expirationDate)
        commit('setProfile', profile)
        commit('setStatus', status)
    },

    handleSignout ({ commit }) {
        lock.logout()
    },

    signout ({ commit }) {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('tokenExpiration')
            localStorage.removeItem('profile');
            localStorage.removeItem('signedIn');

            commit('setToken', false)
            commit('setExpiration', false)
            commit('setProfile', false)
            commit('setStatus', false)
            resolve()
        })
        
    }
}