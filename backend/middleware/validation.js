const validationRules = {
    '/signup': {
        name: { required: true, type: 'string', maxLength: 10, regex: /^[a-zA-Z]{1,10}$/ },
        email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, type: 'string',minLength: 8 , maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
        address: { required: true, type: 'string', regex: /^[a-zA-Z0-9#\-]+$/ },
        phone: { required: true, type: 'number', maxLength: 15, regex: /^\+?[0-9]{10,15}$/ },
    },
    '/login': {
        email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { required: true, type: 'string',minLength: 8, maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  }
    },
    '/change-Password':{
        oldPassword: { required: true, type: 'string',minLength: 8,maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  },
        newPassword: { required: true, type: 'string',minLength: 8,maxLength: 8, regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/  }
    },
   '/forget-Password':{
    email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
   },
   '/verify-Otp':{
    otp: { required: true, type: 'number',minLength: 4, regex: /^\d{4}$/ }
   },
   '/verifyOtp-And-ResetPassword':{
    email: { required: true, type: 'string', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    otp: { required: true, type: 'number',minLength: 4, regex: /^\d{4}$/ },
    newPassword: { required: true, type: 'string', regex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/ },
   }

};

export default validationRules