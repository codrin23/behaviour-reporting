import { Router } from "../deps.js";
import { register, authenticate, logout, showLoginForm, showRegisterForm } from "./controllers/userController.js";
import { landing } from './controllers/landingController.js';
import { startReporting } from './controllers/reportingController.js';

const router = new Router();

router.get('/', landing);

router.get('/auth/registration', showRegisterForm)
router.post('/auth/registration', register);
router.get('/auth/login', showLoginForm);
router.post('/auth/login', authenticate);
router.post('/auth/logout', logout);

router.get('/behavior/reporting', startReporting);

export { router };