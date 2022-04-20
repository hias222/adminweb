import { CombinedInterface } from "../types/CombinedDataInterface"

export function getCombinedList(combinedNumber: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

  let noresults: CombinedInterface[] = [{
    firstname: "",
    lastname: "",
    combinedpoints: "",
    birthdate: "",
    clubname: "",
    combined_name: ""
  }]

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
