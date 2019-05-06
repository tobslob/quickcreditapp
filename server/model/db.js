const models = {
  User: [
    {
      id: '900d6eea-d900-4e9d-9bd9-029a838eg60d',
      email: 'kazmobileapp@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: '900d6eea-d900-5e9d-9bd9-029a838eg00d',
      email: 'tobi4real2050@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: '900d6eea-d900-4e9d-9bd9-029a838eg60d',
      email: 'kazmobileapp@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: '900d6eea-d900-4e9d-9bd9-029a838ef67d',
      email: 'kaztech2016@gmail.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: true,
    },

    {
      id: '75330843-41b8-406c-b48f-1fc54a711d04',
      email: 'newuser@gmail.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
      password: '$2b$10$SVKIQn2qtqPXbvCJNwhnZe0SSO8Dfn5lJ3nOaiXZ.Mt2RCaSaXCL2',
      status: 'pending',
      isAdmin: false,
      createdOn: '2019-05-06T12:54:13.191Z',
      modifiedOn: '2019-05-06T12:54:13.194Z',
    },

    {
      id: '900d6eea-d900-4e9d-9bd9-029a838ef64n',
      email: 'admin@quickcreditapp.herokuapp.com',
      firstName: 'first_name',
      lastName: 'last_name',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: true,
    },
  ],


  Loans: [
    {
      id: '3e66de26-5bbb-430b-9458-f35fc2a06816',
      user: 'kazmobileapp@gmail.com',
      createdOn: Date(),
      status: 'approved',
      repaid: true,
      tenor: 2,
      amount: 4000,
      paymentInstallment: 2100,
      balance: 4200,
      interest: 0.05,
      modifiedOn: Date(),
    },

    {
      id: '3e66de26-5bbb-430b-9458-f35fc2a06816',
      user: 'kazmobileapp@gmail.com',
      createdOn: Date(),
      status: 'approved',
      repaid: false,
      tenor: 2,
      amount: 4000,
      paymentInstallment: 2100,
      balance: 4200,
      interest: 0.05,
      modifiedOn: Date(),
    },

    {
      id: '3e66de26-5bbb-430b-9458-f35fc2a06819',
      user: 'admin@quickcreditapp.herokuapp.com',
      createdOn: Date(),
      status: 'approved',
      repaid: false,
      tenor: 2,
      amount: 4000,
      paymentInstallment: 2100,
      balance: 4200,
      interest: 0.05,
      modifiedOn: Date(),
    },
  ],

  loanRepayment: [
    {
      id: 'b7280966-4290-45a1-b75a-7b6d2fcdb77f',
      loanId: 'Integer',
      createdOn: Date(),
      amount: 4000, // loan amount
      monthlyInstallment: 2100, // what the user is expected to pay
      paidAmount: 2100,
      balance: 2100,
    },
  ],
};
module.exports = models;
