export const parseResult = (obj) => {
    const reportData = [];

    for (let id in obj) {
        reportData.push({
            id: id,
            ...obj[id],
        });
    }

    return reportData;
};

/* NEW REPORT DATA FORMAT
    each item from incoming reports has a collection of reports from one user
    ex  data report: 
    {
        //"foo1" is a collection of reports from 1 user, 
        //"bar1" and "bar2" represents reports made by a single user
        "foo1" : {
            bar1: {
                address: 
                con: 
                date:
                emais: 
                fname: 
                lat: 
                lng: 
            },
            bar2: {
                address: 
                con: 
                date:
                emais: 
                fname: 
                lat: 
                lng: 
            },
        }
        "foo2": {
            bar1: {},
          
        }
    }
*/

// used for parsing nested reports
export const parseReports = (reports) => {
    const reportsData = [];
    for (let reportId in reports) {
        for (let userReportId in reports[reportId]) {
            reportsData.push({
                reportId: reportId,
                userReportId: userReportId,
                ...reports[reportId][userReportId],
            });
        }
    }

    return reportsData;
};

export const getMonth = (dateString) => {
    const dateObject = new Date(dateString);
    const month = dateObject.getMonth();
    return month;
};

export const getYear = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    return year;
};
