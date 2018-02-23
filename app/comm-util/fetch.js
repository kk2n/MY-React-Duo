/**
 * Created by likuan on 11/27 0027.
 */
let Promise = require('es6-promise').Promise;
export function Get(url,fn){
    fetch(url)
        .then(fn)
}