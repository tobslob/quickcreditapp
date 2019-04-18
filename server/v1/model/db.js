let models = {
    User: [
        { id: 'id' },
        { email: 'email@test.com' },
        { firstName: 'first_name' },
        { lastName: 'last_name' },
        { password: 'password' },
        { address: 'Address' },
        { status: 'status' },
        { createdOn: Date() },
        { modifiedOn: Date() },
        { isAdmin: 'false' }
    ]
};

module.exports = models;
