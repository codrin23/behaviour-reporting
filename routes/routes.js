import { Router } from "../deps.js";
import { register, authenticate, logout, showLoginForm, showRegisterForm } from "./controllers/userController.js";
import { landing } from './controllers/landingController.js';
import { startReporting, insertMorningReport, insertEveningReport, morningReporting, eveningReporting } from './controllers/reportingController.js';
import { showSummary, calculateSummary } from './controllers/summaryController.js';
import * as summaryApi from './apis/summaryApi.js';

const router = new Router();

router.get('/', landing);

router.get('/auth/registration', showRegisterForm)
router.post('/auth/registration', register);
router.get('/auth/login', showLoginForm);
router.post('/auth/login', authenticate);
router.post('/auth/logout', logout);

router.get('/behavior/reporting', startReporting);
router.get('/behavior/reporting/morning', morningReporting);
router.get('/behavior/reporting/evening', eveningReporting);
router.post('/behavior/reporting/addMorningReport', insertMorningReport);
router.post('/behavior/reporting/addEveningReport', insertEveningReport);

router.get('/behavior/summary', showSummary);
router.post('/behavior/summary', calculateSummary);

router.get('/api/summary', summaryApi.getLastWeekSummary);
router.get('/api/summary/:year/:month/:day', summaryApi.getSummaryForSpecificDate);

export { router };