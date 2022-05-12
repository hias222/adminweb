export function getCombinedList(combinedNumber: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

  let paramurl = getdataurl + '?' + new URLSearchParams({ 'mode': 'combined', 'combinedid': combinedNumber })

  return fetch(paramurl)
    .then(response => {
      //console.log(response)
      return response.json()
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}

export function getDefinitionList() {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent/" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

  let noresults = [
    {
      value: '0',
      label: '0-0',
    }
  ];

  let paramurl = getdataurl + '?' + new URLSearchParams({'mode': 'combineddefinition' })

  return fetch(paramurl)
    .then(response => response.json())
    .catch((error) => {
      console.log(error)
      return noresults
    })
}

export function sendCombinedList(combinedNumber: string, place: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getevent/" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"
  let paramurl = getdataurl + '?' + new URLSearchParams({ 'combinedid': combinedNumber, 'mode': 'showcombined', 'place': place })

  return fetch(paramurl)
    .then(response => response.json())
    .catch((error) => {
      console.log(error)
      return null
    })
}