import React, { useRef, useEffect, useState } from 'react';
import './SignUp.css';
import JqxValidator from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxvalidator';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
import { navigate } from 'hookrouter';
import { jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

const columns: Array<any> = [
  {
    type: 'button',
    name: 'submit',
    text: 'Submit',
    width: '110px',
    columnWidth: '100%',
    align: 'center',
  },
];
const template: Array<any> = [
  {
    bind: 'name',
    name: 'firstName',
    type: 'text',
    label: 'First name',
    required: true,
    labelWidth: '85px',
    width: '250px',
    info: 'Enter first name, it cannot contain special characters',
    infoPosition: 'right',
  },
  {
    bind: 'surname',
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    required: true,
    labelWidth: '85px',
    width: '250px',
    info: 'Enter last name, it cannot contain special characters',
    infoPosition: 'right',
  },
  {
    bind: 'username',
    name: 'username',
    type: 'text',
    label: 'Username',
    required: true,
    labelWidth: '85px',
    width: '250px',
    info: 'Your username must be between 4 and 12 characters with no special characters',
    infoPosition: 'right',
  },
  {
    bind: 'password',
    type: 'password',
    name: 'password',
    label: 'Password',
    required: true,
    labelWidth: '85px',
    width: '250px',
    info: 'Must contains between 4 and 12 characters, at least one upper case, one lower case one digit and one special character',
    infoPosition: 'right',
  },
  {
    bind: 'email',
    name: 'email',
    type: 'text',
    label: 'Email',
    required: true,
    labelWidth: '85px',
    width: '250px',
    info: 'Enter your email adress',
    infoPosition: 'right',
  },
  {
    type: 'blank',
    rowHeight: '10px',
  },
  {
    columns,
  }];


let values = {
  name: '',
  surname: '',
  email: '',
  password: '',
  username: '',
};


const SignUp = ({ signUp, error, statusCode }) => {
  const jqxValidator = useRef<JqxValidator>(null);
  const jqxForm = useRef<JqxForm>(null);
  const [validatonError, setValidationError] = useState(false);
  const [usernameInUse, setUsernameInUse] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [count, setCount] = useState(0);

  let firstName = {};
  let lastName = {};
  let email = {};
  let password = {};
  let username = {};
  const [rules, setRules] = useState<any[]>([]);

  const containsSpecialCharacters = (input: any, commit: any) => {
    const inputValue = document.querySelector(input.selector).value as string;

    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(inputValue);
  };

  useEffect(() => {
    setCount(count + 1);

    if (jqxForm.current) {
      const submitButton = jqxForm.current.getComponentByName('submit');
      submitButton.on('click', () => {
        submit();
      });
    }

    if (jqxValidator.current && jqxForm.current) {
      const el = document.getElementById('el_0') as HTMLInputElement;
      el.placeholder = '';
      el.value = '';
      const el1 = document.getElementById('el_1') as HTMLInputElement;
      el1.placeholder = '';
      el1.value = '';
      const el2 = document.getElementById('el_2') as HTMLInputElement;
      el2.placeholder = '';
      el2.value = '';
      const el3 = document.getElementById('el_3') as HTMLInputElement;
      el3.placeholder = '';
      el3.value = '';
      const el4 = document.getElementById('el_4') as HTMLInputElement;
      el4.placeholder = '';
      el4.value = '';

      firstName = jqxForm.current.getComponentByName('firstName');
      lastName = jqxForm.current.getComponentByName('lastName');
      email = jqxForm.current.getComponentByName('email');
      password = jqxForm.current.getComponentByName('password');
      username = jqxForm.current.getComponentByName('username');

      setRules([
        {
          input: firstName,
          message: 'Your first name must be between 2 and 40 characters!',
          action: 'keyup, blur',
          rule: 'length=2,40',
        },
        {
          input: firstName,
          message: 'Your first name cannot contain special characters!',
          action: 'keyup, blur, valueChanged',
          rule: containsSpecialCharacters,
        },
        {
          input: lastName,
          message: 'Your last name must be between 2 and 40 characters!',
          action: 'keyup, blur',
          rule: 'length=2,40',
        },
        {
          input: lastName,
          message: 'Your first name cannot contain special characters!',
          action: 'keyup, blur, valueChanged',
          rule: containsSpecialCharacters,
        },
        {
          input: username,
          message: 'Your username must be between 4 and 12 characters!',
          action: 'keyup, blur',
          rule: 'length=4,12',
        },
        {
          input: password,
          message: 'Must be between 4 and 12 characters, one lowercase, one upper case, one digit and one special character',
          action: 'keyup, blur, valueChanged',
          rule: (input: any, commit: any) => {
            const inputValue = document.querySelector(input.selector).value as string;

            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/g.test(inputValue);
          },
          position: 'bottom',
        },
        {
          input: email,
          message: 'Email address is required!',
          action: 'keyup, blur',
          rule: 'required',
        },
        {
          input: email,
          message: 'Please enter valild email address!',
          action: 'keyup, blur',
          rule: 'email',
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (error && error.error && error.status === 409 && count !== 0) {
      setEmailInUse(error.error.includes('email'));
      setUsernameInUse(error.error.includes('username'));
    }
  }, [error, statusCode]);

  const submit = () => {
    if (jqxValidator.current) {
      jqxValidator.current.validate(document.getElementById('form'));
    }
  };

  const register = () => {
    signUp(values);
  };

  const formDataChange = (change) => { values = change.args.value; };

  return (
    <div className="sign-up">
      <div className="form">
        <h1>Sign Up</h1>
        <JqxValidator
          ref={jqxValidator}
          onValidationError={() => setValidationError(true)}
          onValidationSuccess={register}
          rules={rules}
        >
          <JqxForm
            ref={jqxForm}
            template={template}
            value={values}
            onFormDataChange={formDataChange}
          />
        </JqxValidator>
      </div>
      <div className="in-use">
        {usernameInUse && <h3>Username already in use</h3>}
        {emailInUse && <h3>Email already in use</h3>}
        {validatonError && <h3>Please input values as required</h3>}
      </div>
    </div>
  );
};

export default SignUp;
