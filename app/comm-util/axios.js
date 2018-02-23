import ajax from 'axios';
require('es6-promise').polyfill();

let env_t = document.getElementById('root').getAttribute('data-env');
ajax.defaults.baseURL = Boolean(env_t) ? env_t : 'http://192.168.1.57:8888';
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export default ajax

/*

 withCredentials: true,
 headers: {'X-Requested-With': 'XMLHttpRequest'},
 transformRequest: [data => {
 return querystring.stringify(data);
 }]
 例子
 ajax({
 method: 'post',
 url: '/user/12345',
 data: {
 firstName: 'Fred',
 lastName: 'Flintstone'
 }
 });

 ajax.get('/user')
 .then(res=>{
 log(res)
 })
 .catch((err)=>{
 log(err);
 })

 ajax.post('/user',{
 firstName:'Fred',
 lastName:'Flintstone'
 })
 .then(res=>{
 log(res)
 })
 .catch((err)=>{
 log(err);
 })
 */