'use strict'

export class HTTP {
    static get(url, handler) {
        HTTP._request('GET', url, handler)
    }

    static post(url, opts, handler) {
        HTTP._request('POST', url, handler, opts)
    }

    static _request(method, url, handler, opts = null) {
        let xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
                let res = xhr.responseText

                try {
                    res = JSON.parse(res)
                } catch {}

                handler(res)
            }
        }

        if (opts && opts.headers) {
            for (let name in opts.headers) {
                xhr.setRequestHeader(name, opts.headers[name])
            }
        }

        if (opts && opts.body)
            xhr.send(JSON.stringify(opts.body))
        else
            xhr.send(null)
    }
}