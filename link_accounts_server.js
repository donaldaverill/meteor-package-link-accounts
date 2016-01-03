Accounts.registerLoginHandler((options) => {
  if (!options.link) {
    return undefined;
  }

  check(options.link, {
    credentialToken: String,
    credentialSecret: Match.OneOf(null, String),
  });

  const result = OAuth.retrieveCredential(options.link.credentialToken,
    options.link.credentialSecret);
  if (!result) {
    return {
      type: 'link',
      error: new Meteor.Error(
        Accounts.LoginCancelledError.numericError,
        'Login attempt cancelled.'),
    };
  }

  if (result instanceof Error) {
    throw result;
  } else {
    return Accounts.LinkUserFromExternalService(
      result.serviceName, result.serviceData);
  }
});

Accounts.LinkUserFromExternalService = (serviceName, serviceData) => {
  if (!Meteor.userId()) {
    return new Error(
      'Can\'t use LinkUserFromExternalService without current user');
  }

  if (serviceName === 'password' || serviceName === 'resume') {
    throw new Error(
      'Can\'t use LinkUserFromExternalService with internal service ' +
      serviceName);
  }
  if (!_.has(serviceData, 'id')) {
    throw new Error(
      'Service data for service ' + serviceName + ' must include id');
  }

  const user = Meteor.user();
  if (!user) {
    return new Error('User not found for LinkUserFromExternalService.');
  }

  // we do not allow link another account from existing service.
  if (user.services && user.services[serviceName] &&
    user.services[serviceName].id !== serviceData.id) {
    return new Meteor.Error(
      'User can not link a service that is already actived.');
  }
  const setAttrs = {};
  _.each(serviceData, (value, key) => {
    setAttrs['services.' + serviceName + '.' + key] = value;
  });

  Meteor.users.update(user._id, {
    $set: setAttrs,
  });
  return {
    type: serviceName,
    userId: user._id,
  };
};
