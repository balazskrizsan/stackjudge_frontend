export const environment = {
  production: false,
  backend: {
    api: {
      host: 'https://stack-judge-prod.herokuapp.com/'
    },
    account: {
      fbLoginAndRegistrationUrl: 'https://stackjudge-prod.herokuapp.com/account/facebook/registration-and-login'
    }
  },
  cdn: {
    host: 'https://stackjudge-cdn-dev-eu-central-1.s3.eu-central-1.amazonaws.com/'
  }
};
