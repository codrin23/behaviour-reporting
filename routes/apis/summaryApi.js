import { computeLastWeekMorningSummary, computeLastWeekEveningSummary, computeEveningSummaryForUsersForDate, computeMorningSummaryForUsersForDate } from '../../services/summaryService.js';

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



const getSummaryForSpecificDate = async({response, params}) => {
    const requestDate = `${params.year}-${params.month}-${params.day}`;
    const morningReport = await computeMorningSummaryForUsersForDate(requestDate);
    const eveningReport = await computeEveningSummaryForUsersForDate(requestDate);

    response.body = {
        ...morningReport,
        ...eveningReport
    }
}

export { getLastWeekSummary, getSummaryForSpecificDate };