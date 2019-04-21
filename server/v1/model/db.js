const models = {
  User: [
    {
      id: 'id',
      email: 'kazmobileapp@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'status',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: 'false',
    },

    {
      id: '900d6eea-d900-4e9d-9bd9-029a838ef67d',
      email: 'kzzmobileapp@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'status',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: 'false',
    },
  ],


  Loans: [
    {
      id: '3e66de26-5bbb-430b-9458-f35fc2a06816',
      user: 'kzmobileapp@gmail.com',
      createdOn: 'DateTime',
      status: 'pending',
      repaid: false,
      tenor: 2,
      amount: 4000,
      paymentInstallment: 2100,
      balance: 4200,
      interest: 0.05,
    },

    {
      id: '3e66de26-5bbb-430b-9458-f35fc2a06819',
      user: 'kazzmobileapp@gmail.com',
      createdOn: Date(),
      status: 'pending',
      repaid: false,
      tenor: 2,
      amount: 4000,
      paymentInstallment: 2100,
      balance: 4200,
      interest: 0.05,
    },
  ],
};
module.exports = models;
