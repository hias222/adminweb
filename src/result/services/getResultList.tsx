import { ResultDataInterface } from "../types/ResultDataInterface";

function getDataFromCall(restData: any) {

  return new Promise<any>((resolve, reject) => {

    if (restData.eventDefinition.name !== undefined) {
      resolve(restData)
    } else {
      reject('error getDataFromCall');
    }

  });
}


export function getResultList(eventNumber: string, ageGroup: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent/" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"
 
  let noresults: ResultDataInterface = {
    eventDefinition:
      { eventNumber: '0', name: 'Empty' },
    swimmerResults: [
      {
        clubId: '',
        clubName: '',
        swimmerName: '',
        endTime: '',
        place: ''
      }
    ]
  }

  let paramurl = getdataurl + '?' + new URLSearchParams({ 'event': eventNumber, 'agegroup': ageGroup })

  return fetch(paramurl)
    .then(response => response.json())
    .then(data => getDataFromCall(data))
    .catch((error) => {
      console.log(error)
      return noresults
    })
}