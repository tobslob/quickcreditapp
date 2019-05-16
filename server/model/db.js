const models = {
  User: [
    {
      id: 1,
      email: 'kazmobileapp@gmail.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: 2,
      email: 'tobi4real2050@gmail.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: 3,
      email: 'kazmobileapp@gmail.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: false,
    },

    {
      id: 4,
      email: 'kaztech2016@gmail.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
      password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
      address: 'Address',
      status: 'verified',
      createdOn: Date(),
      modifiedOn: Date(),
      isAdmin: true,
    },

    {
      id: 5,
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
      id: 6,
      email: 'admin@quickcreditapp.herokuapp.com',
      firstName: 'Kazeem',
      lastName: 'Odutola',
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
      id: 1,
      user: 'kazmobileap@gmail.com',
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
      id: 2,
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
      id: 3,
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
      id: 1,
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
