export function deleteFile(filename: string) {

  let getdataurl = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/resultdata/getmedia" : process.env.REACT_APP_RESULTDATA_INTERNAL_URL + "/resultdata/getmedia"
  let deleteurl = getdataurl + "?delete=" + filename

  console.log(deleteurl)

  return fetch(deleteurl)
    .then(response => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      return null
    })
}
