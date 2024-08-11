const validationRules = {
    '/signup': {
        name: { required: true, type: 'string', maxLength: 15, regex: /^[a-zA-Z ]{3,15}$/ },
        email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, type: 'string',minLength: 8 , maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
        address: { required: true, type: 'string', regex: /^[a-zA-Z0-9#\-]+$/ },
        phone: { required: true, type: 'string', regex: /^\d{10,15}$/ },
    },
    '/login': {
        email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, type: 'string',minLength: 8, maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  }
    },
    '/change-Password':{
        oldPassword: { required: true, type: 'string',minLength: 8,maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  },
        newPassword: { required: true, type: 'string',minLength: 8,maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  }
    },
  
   '/verify-Otp':{
    otp: { required: true, type: 'number',minLength: 4, regex: /^\d{4}$/ }
   },
   '/verifyOtp-And-ResetPassword':{
    otp: { required: true, type: 'number',minLength: 4, regex: /^\d{4}$/ },
    newPassword: { required: true, type: 'string',minLength: 8 , maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
   },
   '/createAccount': {
    accountHolderName: {required: true, type: 'string', maxLength: 10, regex: /^[a-zA-Z]{1,10}$/ },
    bankName: { required: true, type: 'string', maxLength: 10, regex: /^[a-zA-Z]{1,10}$/},
    },
    // '/deleteAccount/:id':{
    // id:{required: true, type: 'string', regex: /^[0-9a-fA-F]{24}$/}    
    // }
    '/updateProfile': {
        name: { required: true, type: 'string', maxLength: 15, regex: /^[a-zA-Z ]{3,15}$/ },
        email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        address: { required: true, type: 'string', regex: /^[a-zA-Z0-9#\-]+$/ },
        phone: { required: true, type: 'string', regex: /^\d{10,15}$/ },
    },
};

export default validationRules