Meteor.linkWithGoogle = function(opts, cb) {
  if (!Meteor.userId()) {
    throw new Meteor.Error(402,
      'Please login to an existing account before link.');
  }
  if (!Package['accounts-google'] && !Package.google) {
    throw new Meteor.Error(403,
      'Please include accounts-google and google package');
  }
  if (!callback && typeof opts === 'function') {
    options = null;
    callback = opts;
  } else {
    options = opts;
    callback = cb;
  }
  const credentialRequestCompleteCallback =
    Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
  Package.google.Google.requestCredential(options,
    credentialRequestCompleteCallback);
};
