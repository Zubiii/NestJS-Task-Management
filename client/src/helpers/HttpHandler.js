function HttpHandler (res) {
    if(res.status && res.data) return res.data
    else if (res.code && res.response) return res.response.data 
    else return res
}

export default {
    HttpHandler
}