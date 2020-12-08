import { validate, isIn, required, match, isDate} from '../../deps.js';
import { addMorningReport, addEveningReport, getMorningReportForDate, getEveningReportForDate} from '../../services/reportingService.js';

const validationRulesMorningForm = {
  morningReportingDate: [required, isDate],
  sleepDuration: [required, match(/^(?:\d*\.\d{1,2}|\d+)$/)],
  sleepQuality: [required, isIn([1, 2, 3, 4, 5])],
  morningGenericMood: [required, isIn([1, 2, 3, 4, 5])]
};

const validationRulesEveningForm = {
  eveningReportingDate: [required, isDate],
  sportsAndExerciseDuration: [required, match(/^(?:\d*\.\d{1,2}|\d+)$/)],
  studyingDuration: [required, match(/^(?:\d*\.\d{1,2}|\d+)$/)],
  regularityAndQualityEating: [required, isIn([1, 2, 3, 4, 5])],
  eveningGenericMood: [required, isIn([1, 2, 3, 4, 5])]
};

const getMorningReportFormData = async(request) => {
  const data = {
    morningReportingDate: new Date().toISOString().substr(0, 10),
    sleepDuration: "",
    sleepQuality: 3,
    morningGenericMood: 3,
    errors: null
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.morningReportingDate = params.get("morningReportingDate");
    data.sleepDuration = params.get("sleepDuration");
    data.sleepQuality = Number(params.get("sleepQuality"));
    data.morningGenericMood = Number(params.get("morningGenericMood"));
  }

  return data;
}

const getEveningReportFormData = async(request) => {
  const data = {
    eveningReportingDate: new Date().toISOString().substr(0, 10),
    sportsAndExerciseDuration: "",
    studyingDuration: "",
    regularityAndQualityEating: 3,
    eveningGenericMood: 3,
    errors: null
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.eveningReportingDate = params.get("eveningReportingDate");
    data.sportsAndExerciseDuration = params.get("sportsAndExerciseDuration");
    data.studyingDuration = params.get("studyingDuration");
    data.regularityAndQualityEating = Number(params.get("regularityAndQualityEating"));
    data.eveningGenericMood = Number(params.get("eveningGenericMood"));
  }

  return data;
}

const startReporting = async({render, session}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const reportingData = {
    submittedMorningReport: false,
    submittedEveningReport: false,
    errors: null
  };
  const todayMorningReport = await getMorningReportForDate(user.id, new Date().toISOString().substr(0, 10));

  if (todayMorningReport) {
    reportingData.submittedMorningReport = true;
  } 

  const todayEveningReport = await getEveningReportForDate(user.id, new Date().toISOString().substr(0, 10));

  if (todayEveningReport) {
    reportingData.submittedEveningReport = true;
  }

  render('./reporting/reporting.ejs', {authenticated, user, ...reportingData});
}

const insertMorningReport = async ({session, request, response, render}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const reportingData = await getMorningReportFormData(request);

  const [passes, errors] = await validate(reportingData, validationRulesMorningForm);
  if (!passes) {
    if (Number(reportingData.sleepDuration) < 0 || Number(reportingData.sleepDuration) > 24) {
      errors.push({
        sleepDuration: {
          numberBetween: `${Number(reportingData.sleepDuration)} must be between 0 - 24`
        }
      });
    }

    reportingData.errors = errors;

    render("./reporting/morning-form.ejs", {authenticated, user, ...reportingData});
    return;
  }

  // convert durations to numbers
  const morningReport = {
    userId: user.id,
    reportingDate: reportingData.morningReportingDate,
    sleepDuration: Number(reportingData.sleepDuration),
    sleepQuality: reportingData.sleepQuality,
    genericMood: reportingData.morningGenericMood
  }

  await addMorningReport(morningReport);

  response.redirect('/behavior/reporting');
}

const insertEveningReport = async ({session, request, response, render}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const reportingData = await getEveningReportFormData(request);

  const [passes, errors] = await validate(reportingData, validationRulesEveningForm);
  if (!passes) {
    if (Number(reportingData.sportsAndExerciseDuration) < 0 || Number(reportingData.sportsAndExerciseDuration) > 24) {
      errors.push({
        sportsAndExerciseDuration: {
          numberBetween: `${Number(reportingData.sportsAndExerciseDuration)} must be between 0 - 24`
        }
      });
    }

    if (Number(reportingData.studyingDuration) < 0 || Number(reportingData.studyingDuration) > 24) {
      errors.push({
        studyingDuration: {
          numberBetween: `${Number(reportingData.studyingDuration)} must be between 0 - 24`
        }
      });
    }

    reportingData.errors = errors;

    render("./reporting/evening-form.ejs", {authenticated, user, ...reportingData});
    return;
  }

  // convert durations to numbers
  const eveningReport = {
    userId: user.id,
    reportingDate: reportingData.eveningReportingDate,
    sportsAndExerciseDuration: Number(reportingData.sportsAndExerciseDuration),
    studyingDuration: Number(reportingData.studyingDuration),
    regularityAndQualityEating: reportingData.regularityAndQualityEating,
    genericMood: reportingData.eveningGenericMood
  }
  await addEveningReport(eveningReport);

  response.redirect('/behavior/reporting');
}

const morningReporting = async ({session, render}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const reportingData = await getMorningReportFormData();

  render('./reporting/morning-form.ejs', {authenticated, user, ...reportingData})
}

const eveningReporting = async ({session, render}) => {
  const authenticated = await session.get('authenticated');  
  const user = await session.get('user');
  const reportingData = await getEveningReportFormData();

  render('./reporting/evening-form.ejs', {authenticated, user, ...reportingData})
}

export {startReporting, insertMorningReport, insertEveningReport, morningReporting, eveningReporting};