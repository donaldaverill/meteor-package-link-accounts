Meteor.linkWithQuickBooks = function(opts, cb) {
  let options;
  let callback;
  if (!Meteor.userId()) {
    throw new Meteor.Error(402,
      'Please login to an existing account before link.');
  }
  if (!Package['fourquet:accounts-quickbooks'] &&
    !Package['fourquet:quickbooks']) {
    throw new Meteor.Error(403,
      'Please include fourquet:accounts-quickbooks package');
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
  QuickBooks.requestCredential(options,
    credentialRequestCompleteCallback);
};
