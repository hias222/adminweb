export function getResultList() {

    let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/upload" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getevent/"

    return fetch(getdataurl)
      .then(data => data.json())
  }