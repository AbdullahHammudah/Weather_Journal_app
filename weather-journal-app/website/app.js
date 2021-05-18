/* Global Variables */
const key = `a39765fe4c05301164fa6f914675a1c7`;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;


/************
 * click listening, then chaining the three steps of
 *  :> getting the data 
 * -> post it to the server 
 * -> updating the user interface
 ************/

document.getElementById('generate').addEventListener('click', async (evt)=>{
    evt.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
if(zipCode){
    try{
        getData(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}&units=metric`)
        .then(data=>postData('/savingData',{
            temprature:data.main.temp,
            date:newDate,
            user_data:feelings,
        })
        ).then(()=>updateUI())
    }catch(error){
        console.log('error',error);
    }}else{
        alert('Please enter zip code');
    }
})

/*********************getting data from wheather api**********************/
const getData = async (apiLink)=>{
    const res = await fetch (apiLink);
    try{
        const data = await res.json();
        // console.log(data);
        return data;
    }catch(error){
        console.log('error',error);
    }
}
/*********************posting the data to the server**********************/
const postData = async (url='', dataToPost ={}) =>{
    const res = await fetch (url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(dataToPost)
    })
    try{
        return dataToPost;
    }catch(err){err};
}
/*********************getting the data from the server & updating the UI after**********************/
const updateUI = async () => {
    const request =  await fetch ('/userData'); 

    try{
        const data =  await request.json();
        document.getElementById('temp').innerHTML = `Temp: ${data.temp} C`;
        document.getElementById('date').innerHTML = `${data.date}`;
        document.getElementById('content').innerHTML = `But you feels like: ${data.feelings}`;
    }catch(error){
        console.log('error',error);
    }
}