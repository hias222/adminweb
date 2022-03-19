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


export function getResultList() {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/upload" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"
  console.log(getdataurl)

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

  return fetch(getdataurl)
    .then(response => response.json())
    .then(data => getDataFromCall(data))
    .catch((error) => {
      console.log(error)
      return noresults
    })
}