const getWeekNumber = (d) => {
    const auxDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    auxDate.setUTCDate(auxDate.getUTCDate() + 4 - (auxDate.getUTCDay()||7));
    
    const yearStart = new Date(Date.UTC(auxDate.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (auxDate - yearStart) / 86400000) + 1)/7);
   
    return weekNo;
}

const getDateOfISOWeek = (w, y) => {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

export { getWeekNumber, getDateOfISOWeek };