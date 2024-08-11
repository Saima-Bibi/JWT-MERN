const namePattern = /^[a-zA-Z ]{3,15}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8}$/
const newPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8}$/
const addressPattern = /^[a-zA-Z0-9#\-]+$/
const phonePattern = /^\d{10,15}$/
const otpPattern = /^\d{4}$/

function Validation(values){
  let errors= {}
  console.log(values)
 // Validate name
 if (values.name === '') {
    errors.name = 'Name is required';
  } else if (!namePattern.test(values.name)) {
    errors.name = 'Name must be 3-15 characters long and contain only alphabets';
  }

  // Validate email
  if (values.email === '') {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  // Validate password
  if (values.password === '') {
    errors.password = 'Password is required';
  } else if (!passwordPattern.test(values.password)) {
    errors.password = 'Password must be 8 chars long including letters, nums, special char';
  }



  // Validate address
  if (values.address === '') {
    errors.address = 'Address is required';
  } else if (!addressPattern.test(values.address)) {
    errors.address = 'Address can only contain alphanumeric characters, #, and -';
  }

  // Validate phone
  if (values.phone === '') {
    errors.phone = 'Phone number is required';
  } else if (!phonePattern.test(values.phone)) {
    errors.phone = 'Phone must be 10-15 digits long ';
  }

if(values.otp === 0){
  errors.otp = 'otp is required'
}
else if(!otpPattern.test(values.otp) || !typeof values.otp === 'number'){
  errors.otp = 'otp must be of 4 digits'
}


if (values.newPassword === '') {
  errors.newPassword = 'new password is required';
} else if (!newPasswordPattern.test(values.newPassword)) {
  errors.newPassword = 'Password must be 8 chars long including letters, nums, special char';
}
return errors

}
export default Validation