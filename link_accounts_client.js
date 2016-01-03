Accounts.oauth.tryLinkAfterPopupClosed = function(credentialToken, callback) {
  const credentialSecret = OAuth._retrieveCredentialSecret(credentialToken);
  Accounts.callLoginMethod({
    methodArguments: [{
      link: {
        credentialToken,
        credentialSecret,
      },
    }],
    userCallback: callback && function(err) {
      if (err && err instanceof Meteor.Error &&
        err.error === Accounts.LoginCancelledError.numericError) {
        callback(new Accounts.LoginCancelledError(err.details));
      } else {
        callback(err);
      }
    },
  });
};
Accounts.oauth.linkCredentialRequestCompleteHandler = function(callback) {
  return function(credentialTokenOrError) {
    if (credentialTokenOrError && credentialTokenOrError instanceof Error) {
      if (callback) {
        callback(credentialTokenOrError);
      }
    } else {
      Accounts.oauth.tryLinkAfterPopupClosed(credentialTokenOrError,
        callback);
    }
  };
};
