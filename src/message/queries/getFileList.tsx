export function getFileList() {

    let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getmedia" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getmedia"
 
    // need exception !!!
    // endpoint notworking 
    return fetch(getdataurl)
      .then(response => response.json())
      .catch((error) => {
        console.log(error)
        return null
      })
  }
  