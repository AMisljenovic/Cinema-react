import React, { useRef, useState, useEffect } from 'react';
import { navigate } from 'hookrouter';
import './Signin.css';
import JqxInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxinput';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxPasswordInput from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxpasswordinput';

const Signin = ({ signIn, loginResponse, statusCode }) => {
  const [bothValues, setBothValues] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const jqxInput = useRef<JqxInput>(null);
  const jqxPassword = useRef<JqxPasswordInput>(null);

  const login = () => {
    setBothValues(false);
    setInvalidCredentials(false);

    if (jqxInput.current && jqxPassword.current) {
      const input = jqxInput.current.val();
      const password = jqxPassword.current.val();

      if (!(input && password)) {
        setBothValues(true);
        return;
      }

      if (input.includes('@')) {
        signIn('', input, password);
      } else {
        signIn(input, '', password);
      }
    }
  };

  useEffect(() => {
    console.log(statusCode);
    if (statusCode === 200) {
      sessionStorage.setItem('user', JSON.stringify(loginResponse));
      navigate('/home');
    } else if (statusCode === 401) {
      setInvalidCredentials(true);
    }
  }, [statusCode]);


  return (
    <div className="sign-in">
      <div className="new-user">
        <h2>
          New here?
          <a>Sign up</a>
        </h2>
      </div>
      <div>
        <h2>Username or email</h2>
        <JqxInput width="200" height="30" placeHolder="" ref={jqxInput} />
      </div>
      <div className="password">
        <h2>Password</h2>
        <JqxPasswordInput width="200" height="30" placeHolder="" ref={jqxPassword} />
      </div>
      <div className="confirm">
        <JqxButton width="170" template="warning" onClick={login}>Login</JqxButton>
        {invalidCredentials && <h4>Invalid username(email) or password</h4>}
        {bothValues && <h4>Please enter both username(email) and password</h4>}
      </div>
    </div>
  );
};

export default Signin;
