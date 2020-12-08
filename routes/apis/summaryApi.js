import { computeLastWeekMorningSummary, computeLastWeekEveningSummary, computeEveningSummaryForUsersForDate, computeMorningSummaryForUsersForDate } from '../../services/summaryService.js';
import { required, validate, match } from '../../deps.js';

const getLastWeekSummary = async({response}) => {
    const summaryMorning = await computeLastWeekMorningSummary();
    const summaryEvening = await computeLastWeekEveningSummary();
    const resultingArray = [];

    for (let i = 0; i < summaryMorning.length; i++) {
        for (let j = 0; j < summaryEvening.length; j++) {
            if (summaryMorning[i].reporting_date.getTime() === summaryEvening[j].reporting_date.getTime()) {
                
                resultingArray.push({
                    ...summaryMorning[i],
                    ...summaryEvening[j]
                });
                break;
            }
        }
        resultingArray.push(summaryMorning[i]);
    }

    for (let i = 0; i < summaryEvening.length; i++) {
        for (let j = 0; j < resultingArray.length; j++) {
            if (summaryEvening[i].reporting_date.getTime() === resultingArray[j].reporting_date.getTime()) {
                continue;
            }
        }
        resultingArray.push(summaryEvening[i]);
    }

    response.body = resultingArray;
}

const validationRulesSummaryDate = {
    year: [required, match(/^\d{4}$/)],
    month: [required, match(/^(0?[1-9]|1[012])$/)],
    day: [required, match(/([1-9]|[12]\d|3[01])/)]
};

const getSummaryForSpecificDate = async({response, params}) => {
    // validate request params

    let [passes, errors] = await validate({
        year: params.year,
        month: params.month,
        day: params.day
    }, validationRulesSummaryDate);

    if (Number(params.day) < 1 || Number(params.day) > 31) {
        passes = null;
        errors = {
            "day": {
                "match": "day format is incorrect"
            }
        };
    }

    if (!passes) {

        response.status = 404;
        response.body = errors;
        return;
    }

    const requestDate = `${Number(params.year)}-${Number(params.month)}-${Number(params.day)}`;
    const morningReport = await computeMorningSummaryForUsersForDate(requestDate);
    const eveningReport = await computeEveningSummaryForUsersForDate(requestDate);

    response.body = {
        ...morningReport,
        ...eveningReport
    }
}

export { getLastWeekSummary, getSummaryForSpecificDate };