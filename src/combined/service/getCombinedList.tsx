import { eventDefinition } from "../../result/types/EventDefinition";
import { resultSwimmerData } from "../../result/types/ResultSwimmerData";

interface CombinedDataInterface {
  eventDefinition: eventDefinition;
  swimmerResults: resultSwimmerData[];
}

export function getCombinedList(combinedNumber: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

  let noresults: CombinedDataInterface = {
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

  let paramurl = getdataurl + '?' + new URLSearchParams({ 'mode': 'combined', 'number': combinedNumber })
  //let paramurl = getdataurl + '?' + new URLSearchParams({ 'event': combinedNumber, 'mode': 'agegroups' })

  return fetch(paramurl)
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch((error) => {
      console.log(error)
      return noresults
    })
}
