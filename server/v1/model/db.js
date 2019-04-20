let models = {
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
            isAdmin: 'false'
        },

        {
            id: '900d6eea-d900-4e9d-9bd9-029a838ef67d',
            email: 'kzmobileapp@gmail.com',
            firstName: 'first_name',
            lastName: 'last_name',
            password: '$2b$10$i8J5Ks/1t0W3Ifj1l435BuIxnI.f.qpbzrPX8KI006pjElGrFi86S',
            address: 'Address',
            status: 'status',
            createdOn: Date(),
            modifiedOn: Date(),
            isAdmin: 'false'
        }
    ],

    Loans: [
        {
            id : 'Integer',
            user : 'String', // user email
            createdOn : 'DateTime',
            status : 'String', // pending, approved, rejected
            repaid : 'Boolean',
            tenor : 'Integer', // maximum of 12 months
            amount : 'Float',
            paymentInstallment : 'Float', // monthly installment payment (amount + interest) / tenor
            balance :'Float' ,
            interest : 'Float', // 5% of amount
        }
    ]

};

module.exports = models;
