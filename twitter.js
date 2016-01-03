Meteor.linkWithTwitter = function(opts, cb) {
  let options;
  let callback;
  if (!Meteor.userId()) {
    throw new Meteor.Error(402,
      'Please login to an existing account before link.');
  }
  if (!Package['accounts-twitter'] && !Package.twitter) {
    throw new Meteor.Error(403,
      'Please include accounts-twitter and twitter package');
  }

  if (!callback && typeof opts === 'function') {
    callback = opts;
    options = null;
  } else {
    options = opts;
    callback = cb;
  }

  const credentialRequestCompleteCallback =
    Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
  Package.twitter.Twitter.requestCredential(options,
    credentialRequestCompleteCallback);
};
