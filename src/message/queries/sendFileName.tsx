export function sendFilenName(fileName: string) {

    var backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

    var version = 1
    console.log(backendConnect)
    fetch(backendConnect, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "message": "video " + fileName
        })
    })
        .then((data) => console.log('Success'))
        .catch((err) => console.log(err))
};