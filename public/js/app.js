


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageError = document.querySelector('#error')
const messageData = document.querySelector('#data')




weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
 
    const location = search.value

    messageError.textContent = 'loading...'
    messageData.textContent = ''

    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{    
        response.json().then((data)=>{
                if(data.error){
                    console.log(data.error)
                    messageError.textContent = data.error
                }else{
                    messageError.textContent = data.location
                    messageData.textContent = data.forecastdata
                    console.log(data.location)
                    console.log(data.forecastdata)

            }

    })
})

})