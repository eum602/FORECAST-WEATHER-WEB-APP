//this runs on client side
console.log('clientside js file is loaded')
fetch(`http://puzzle.mead.io/puzzle`).then(response=>{
    response.json().then(data=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')//it matches the first element that it finds
const search = document.querySelector('input')//it matches the first element that it finds
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit',e=>{
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ""
    const location = search.value
    fetch(`http://localhost:3000/weather?address=${location}`).then(response=>{
        response.json().then((data)=>{
            const {error,forecast,location, address} = data
            if(error){
                return messageOne.textContent=error//console.log(error)
            }

            //console.log(forecast,location,address)
            messageOne.textContent = location
            messageTwo.textContent=`Forecast: ${forecast}`
        })
    })
})