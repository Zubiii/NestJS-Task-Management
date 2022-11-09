import VueJwtDecode from 'vue-jwt-decode'

export default function auth ({next}) {
    let isLoggedIn = localStorage.getItem('accessToken')
    if(!isLoggedIn){
        return next({
            name: 'login'
        })
    }
    let extToken = VueJwtDecode.decode(localStorage.getItem('accessToken'))

    let expiredTime = new Date(extToken.exp * 1000)
    let nowTime = new Date()

    if(expiredTime < nowTime){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('username')
        return next({
            name: 'login'
        })
    }

    return next()
}