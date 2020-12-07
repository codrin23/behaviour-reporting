const dropDownMenu2Element = document.getElementById('dropdownMenu2');
const formsContainer = document.getElementById('forms-container');
const cloneMorningReportingFormElement = document.getElementById('morningReportingForm').cloneNode(true);
const cloneEveningReportingFormElement = document.getElementById('eveningReportingForm').cloneNode(true);

dropDownMenu2Element.innerText = 'Morning Report';
formsContainer.removeChild(document.getElementById('eveningReportingForm'));

const activateMorningReport = () => {
    dropDownMenu2Element.innerText = 'Morning Report';
    const eveningReportingForm = document.getElementById('eveningReportingForm');
    if (eveningReportingForm) {
        formsContainer.removeChild(eveningReportingForm);
    }
    formsContainer.appendChild(cloneMorningReportingFormElement);
}

const activateEveningReport = () => {
    dropDownMenu2Element.innerText = 'Evening Report';
    const morningReportingForm = document.getElementById('morningReportingForm');
    if (morningReportingForm) {
        formsContainer.removeChild(morningReportingForm);
    }
    formsContainer.appendChild(cloneEveningReportingFormElement);
}