export const helpHttp = () => {
    const customFetch = (endpoint, options) => {
        const defaultHeaders = {
            accept: "application/json"
        }
        const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method || "Get";
        if(!options.headers){
            options.headers = {...defaultHeaders, ...options.headers}
        } else {options.headers = defaultHeaders};
        options.body = JSON.stringify(options.body) || false;
        if(!options.body){
            delete options.body;
        }
        console.log(options);
        setTimeout(()=>{controller.abort()}, 3000);
        console.log(endpoint);
        
        return fetch(endpoint, options).then(res => 
            res.ok ? res.json() : Promise.reject({
                err:true,
                status:res.status || "00",
                statusText:res.statusText || "Ocurrio un error",
            })).catch((err) => err);   
    }
    const get = (url, options = {}) => {
        return customFetch(url, options)
    }

    const post = (url, options = {}) => {
        console.log(options)
        options.method = "Post";
        return customFetch(url, options);
    }

    const put = (url, options = {}) => {
        options.method = "Put";
        return customFetch(url, options);
    }

    const del = (url, options = {}) => {
        options.method = "Delete";
        return customFetch(url, options);
    }

    return{
        get, post, put, del
    }

}