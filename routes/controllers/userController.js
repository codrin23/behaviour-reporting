import * as userService from "../../services/userService.js";
import {required, validate, isEmail, lengthBetween} from '../../deps.js';

const validationRulesLoginForm = {
    password: [required, lengthBetween(4, 20)],
    email: [required, isEmail]
};

const validationRulesRegistrationForm = {
    verification: [required, lengthBetween(4, 20)],
    password: [required, lengthBetween(4, 20)],
    email: [required, isEmail]
};

const getDataLoginForm = async (request) => {
    const data = {
      password: "",
      email: "",
      errors: null
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.password = params.get("password");
      data.email = params.get("email");
    }
  
    return data;
};

const getDataRegistrationForm = async (request) => {
    const data = {
      password: "",
      email: "",
      verification: "",
      errors: null
    };
  
    if (request) {
      const body = request.body();
      const params = await body.value;
      data.password = params.get("password");
      data.verification = params.get("verification");
      data.email = params.get("email");
    }
  
    return data;
};

const register = async({request, response, render}) => {
  const data = await getDataRegistrationForm(request);
  const [passes, errors] = await validate(data, validationRulesRegistrationForm);
  
  if (!passes) {
    data.errors = errors;
    data.password = "";
    data.verification = "";
    render("./auth/register.ejs", data);
    return;
  }

  if (data.password !== data.verification) {
    data.errors = {
      password: {
        mismatch: "password does not match verification"
      }
    }
    data.password = "";
    data.verification = "";
    render("./auth/register.ejs", data);
    return;
  }

  const registeredEmail = await userService.register(data.email, data.password);

  if (!registeredEmail) {
    data.errors = {
      email: {
        alreadyUsed: "email is already used"
      }
    }
    data.password = "";
    data.verification = "";
    render("./auth/register.ejs", data);
    return;
  }

  response.redirect('/auth/login');
};

const authenticate = async({request, response, session, render}) => {
  const data = await getDataLoginForm(request);
  const [passes, errors] = await validate(data, validationRulesLoginForm);

  if (!passes) {
    data.errors = errors;
    data.password = "";
    render("./auth/login.ejs", data);
    return;
  }

  const user = await userService.authenticate(data.email, data.password);

  if (!user) {
    response.status = 401;
    data.errors = {
        invalidCredentials: {
          invalidCredentials: "Invalid email or password"
        }
    }
    data.email = "";
    data.password = "";
    render("./auth/login.ejs", data);
    return;
  }

  const authenticated = true;

  await session.set('authenticated', authenticated);
  await session.set('user', user);

  response.redirect('/');
}

const logout = async({session, response}) => {
  await session.set('authenticated', null);
  await session.set('user', null);
  response.redirect('/');
}

const showRegisterForm = async({render}) => {
  render('./auth/register.ejs', {email: "", password: "", verification: "", errors: null});
};
 

const showLoginForm = async({render}) => {
  render('./auth/login.ejs', {email: "", password: "", errors: null});
};

export { register, authenticate, logout, showLoginForm, showRegisterForm };