class GetDeviceType {
    isMobile() {
        return (/iPad|iPhone|iPod/.test(navigator.userAgent) ) || (/Android/.test(navigator.userAgent))
    }
    
    isWebview() {
        const navigator:any = window.navigator
        const userAgent = navigator.userAgent
        const normalizedUserAgent = userAgent.toLowerCase()
        const standalone = navigator.standalone
        
        const isIos =
        /ip(ad|hone|od)/.test(normalizedUserAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        const isAndroid = /android/.test(normalizedUserAgent)
        const isSafari = /safari/.test(normalizedUserAgent)
        const isWebview = (isAndroid && /; wv\)/.test(normalizedUserAgent)) || (isIos && !standalone && !isSafari)
        
        return isWebview
    }
}


const getDeviceType = new GetDeviceType();
export default  getDeviceType;