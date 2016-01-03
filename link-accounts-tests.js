if (Meteor.isClient) {
  Tinytest.add('Meteor.linkWithGoogle - defined on client',
    (test) => {
      test.notEqual(Meteor.linkWithGoogle, undefined, 'Expected ' +
        'Meteor.linkWithGoogle to be defined on the client.');
    });
  Tinytest.add('Meteor.linkWithQuickBooks - defined on client',
    (test) => {
      test.notEqual(Meteor.linkWithQuickBooks, undefined, 'Expected ' +
        'Meteor.linkWithQuickBooks to be defined on the client.');
    });
  Tinytest.add('Meteor.linkWithTwitter - defined on client',
    (test) => {
      test.notEqual(Meteor.linkWithTwitter, undefined, 'Expected ' +
        'Meteor.linkWithTwitter to be defined on the client.');
    });
  Tinytest.add('Meteor.linkWithFacebook - defined on client',
    (test) => {
      test.notEqual(Meteor.linkWithFacebook, undefined, 'Expected ' +
        'Meteor.linkWithFacebook to be defined on the client.');
    });
}

if (Meteor.isServer) {
  Tinytest.add('Meteor.linkWithGoogle - undefined on server',
    (test) => {
      Meteor.linkWithGoogle = Meteor.linkWithGoogle || undefined;
      test.isUndefined(Meteor.linkWithGoogle,
        'Expected Meteor.linkWithGoogle ' +
        'to be undefined on the server.');
    });
  Tinytest.add('Meteor.linkWithQuickBooks - undefined on server',
    (test) => {
      Meteor.linkWithQuickBooks = Meteor.linkWithQuickBooks || undefined;
      test.isUndefined(Meteor.linkWithQuickBooks,
        'Expected Meteor.linkWithQuickBooks to be undefined on the server.'
      );
    });
  Tinytest.add('Meteor.linkWithTwitter - undefined on server',
    (test) => {
      Meteor.linkWithTwitter = Meteor.linkWithTwitter || undefined;
      test.isUndefined(Meteor.linkWithTwitter,
        'Expected Meteor.linkWithTwitter to be undefined on the server.');
    });
  Tinytest.add('Meteor.linkWithFacebook - undefined on server',
    (test) => {
      Meteor.linkWithFacebook = Meteor.linkWithFacebook || undefined;
      test.isUndefined(Meteor.linkWithFacebook,
        'Expected Meteor.linkWithFacebook to be undefined on the server.');
    });
}
