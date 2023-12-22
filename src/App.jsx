import { useState } from 'react';
import 'tachyons';
import copyImg from './Images/copy.svg';
import generateImg from './Images/zap.svg';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const letters = 'qwertyuiopasdfghjklzxcvbnm';
  const upperCaseLetters = letters.toUpperCase();
  const numbers = '1234567890';
  const specialCharacters = '!@#$%^&*><?/:;_+=';
  const allChars = letters + numbers + specialCharacters + upperCaseLetters;

  const generatePassword = () => {
    const lengthValue = parseInt(passwordLength);

    if (isNaN(lengthValue) || lengthValue < 8 || lengthValue > 16) {
      setErrorMessage('Error: The length should be between 8 and 16.');
    } else {
      let generatedPassword = '';
      generatedPassword += letters[Math.floor(Math.random() * letters.length)];
      generatedPassword += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
      generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
      generatedPassword += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

      while (generatedPassword.length < lengthValue) {
        generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
      }

      setErrorMessage('');
      setPassword(generatedPassword);
    }
  };

  const copyPassword = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.select();
    document.execCommand('copy');
  };

  return (
      <div className="mb5">
        <header className="mw7 center ph5-l">
          <h1>Random Password generator</h1>
        </header>
        <main className="mw7 center ph5-l">
          <div>
            <h1>
              Generate a <br />
              Random Password
            </h1>
          </div>
          <section className="center pa2 mb4 f4">
            <label htmlFor="length">
              Length of the password:
              <input
                type="text"
                id="length"
                className="bn shade br1 pa2 bg-light-gray ml2-ns black outline-0 mt2 mb3"
                placeholder="within 8 or 16"
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
              />
            </label>
            <p id="error" className="red fw-bolder shade mt2">
              {errorMessage}
            </p>
          </section>
          <div className="shadow-1 pa2 inline-flex justify-between w-100 br4 bg-white w-70-ns mb4">
            <input
              className="bn w-90 bg-transparent f4 pa1 outline-0"
              type="text"
              id="password"
              placeholder="Password"
              value={password}
              readOnly
            />
            <img
              src={copyImg}
              className="w-10 pointer"
              alt="copy"
              onClick={copyPassword}
            />
          </div>
          <button
            className="shadow-1 f4 pointer pa3 inline-flex justify-between w-100 br4 white bg-dark-blue w-70-ns bn"
            onClick={generatePassword}
          >
            <span>Generate Password</span> <img src={generateImg} alt="generate" />
          </button>
        </main>
      </div>
  );
};

export default App;
