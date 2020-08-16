import React, { useRef, useState, useEffect } from 'react';
import { navigate } from 'hookrouter';
import './ProfileModal.css';
import JqxValidator from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxvalidator';
import JqxForm from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxform';
import Modal from 'react-bootstrap/Modal';

const columns: Array<any> = [
  {
    type: 'button',
    name: 'submit',
    text: 'Submit',
    width: '110px',
    columnWidth: '50%',
    align: 'right',
  },
  {
    type: 'button',
    name: 'cancel',
    text: 'Cancel',
    width: '110px',
    columnWidth: '50%',
  },
];
const template: Array<any> = [
  {
    bind: 'name',
    name: 'firstName',
    type: 'text',
    label: 'First name',
    required: true,
    labelWidth: '115px',
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
    labelWidth: '115px',
    width: '250px',
    info: 'Enter last name, it cannot contain special characters',
    infoPosition: 'right',
  },
  {
    bind: 'newPassword',
    type: 'password',
    name: 'password',
    label: 'New password',
    required: false,
    labelWidth: '115px',
    width: '250px',
    info: 'Must contains between 4 and 12 characters, at least one upper case, one lower case one digit and one special character',
    infoPosition: 'right',
  },
  {
    bind: 'password',
    type: 'password',
    name: 'oldPassword',
    label: 'Password',
    required: true,
    labelWidth: '115px',
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
    labelWidth: '115px',
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
  newPassword: '',
};

let user: any;

const ProfileModal = ({ updateUser, updateStatusCode, setOpenModal, clearAction }) => {
  const jqxValidator = useRef<JqxValidator>(null);
  const jqxForm = useRef<JqxForm>(null);
  const [validatonError, setValidationError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [profileIsntUpdated, setProfileIsntUpdated] = useState(false);

  let firstName = {};
  let lastName = {};
  let email = {};
  let password = {};
  const [rules, setRules] = useState<any[]>([]);

  const containsSpecialCharacters = (input: any, commit: any) => {
    const inputValue = document.querySelector(input.selector).value as string;

    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(inputValue);
  };

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    user = JSON.parse(data || '{}');
    values.email = user.email;
    values.name = user.name;
    values.surname = user.surname;
    values.username = user.username;
  }, []);

  useEffect(() => {
    if (updateStatusCode === 200) {
      alert('Profile successfully updated! You will be signed out and redirected to sign in page');
      sessionStorage.removeItem('user');
      navigate('/signin');
      setModalIsOpen(false);
      clearAction();
    } else if (updateStatusCode === 400) {
      setValidationError(true);
    } else if (updateStatusCode === 401) {
      setWrongPassword(true);
    } else if (updateStatusCode === 409) {
      setEmailInUse(true);
    }
  }, [updateStatusCode]);

  useEffect(() => {
    if (jqxForm.current) {
      const submitButton = jqxForm.current.getComponentByName('submit');
      submitButton.on('click', () => {
        submit();
      });
    }

    if (jqxValidator.current && jqxForm.current) {
      const el = document.getElementById('el_0') as HTMLInputElement;
      el.placeholder = '';
      el.value = user.name;
      const el1 = document.getElementById('el_1') as HTMLInputElement;
      el1.placeholder = '';
      el1.value = user.surname;
      const el2 = document.getElementById('el_2') as HTMLInputElement;
      el2.placeholder = '';
      const el3 = document.getElementById('el_3') as HTMLInputElement;
      el3.placeholder = '';
      const el4 = document.getElementById('el_4') as HTMLInputElement;
      el4.placeholder = '';
      el4.value = user.email;

      const cancelButton = jqxForm.current.getComponentByName('cancel');
      cancelButton.on('click', () => {
        closeModal();
      });

      firstName = jqxForm.current.getComponentByName('firstName');
      lastName = jqxForm.current.getComponentByName('lastName');
      email = jqxForm.current.getComponentByName('email');
      password = jqxForm.current.getComponentByName('password');

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
          input: password,
          message: 'Must be between 4 and 12 characters, one lowercase, one upper case, one digit and one special character',
          action: 'keyup, blur, valueChanged',
          rule: (input: any, commit: any) => {
            const inputValue = document.querySelector(input.selector).value as string;

            return inputValue.length === 0 ? true : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/g.test(inputValue);
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

  const submit = () => {
    if (jqxValidator.current) {
      jqxValidator.current.validate(document.getElementById('form'));
    }
  };

  const register = () => {
    if (values.email === user.email && values.name === user.name
      && values.surname === user.surname && values.newPassword === '') {
      setProfileIsntUpdated(true);
      return;
    }
    setProfileIsntUpdated(false);

    values.email = user.email === values.email ? '' : values.email;

    values.username = user.username;

    setEmailInUse(false);
    setProfileIsntUpdated(false);
    setValidationError(false);
    setWrongPassword(false);

    updateUser(values);
  };

  const closeModal = () => {
    if (jqxValidator.current) {
      jqxValidator.current.hide();
      setModalIsOpen(false);
      setOpenModal(false);
    }
  };

  const formDataChange = (change) => { values = change.args.value; };

  return (
    <Modal show={modalIsOpen}>
      <div className="profile-modal">
        <div className="form">
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
          {wrongPassword && <h3>Old password doesn&apos;t match</h3>}
          {emailInUse && <h3>Email already in use</h3>}
          {validatonError && <h3>Please input values as required</h3>}
          {profileIsntUpdated && <h3>You haven&apos;t changed any profile field</h3>}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
