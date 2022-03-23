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
        firstname: '',
        lastname: '',
        name: '',
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

export function getAgeList(eventNumber: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent/" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

  let noresults = [
    {
      value: '0',
      label: '0-0',
    }
  ];

  let paramurl = getdataurl + '?' + new URLSearchParams({ 'event': eventNumber, 'mode': 'agegroups' })

  return fetch(paramurl)
    .then(response => response.json())
    .catch((error) => {
      console.log(error)
      return noresults
    })
}