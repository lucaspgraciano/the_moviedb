const apiKey = '00d613736d2267eb32677b35884d9e93'
const imagemUrl = 'https://image.tmdb.org/t/p/w500'
const url = 'https://api.themoviedb.org/3/search/movie?api_key=00d613736d2267eb32677b35884d9e93'

const buttonElement = document.querySelector("#buscarBt")
const inputElement = document.querySelector("#buscarIn")
const moviesSearchable = document.querySelector('#buscaFilmes')
const imgElement = document.querySelector('img')


function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path){
            return `<img src=${imagemUrl + movie.poster_path} data-movie-id=${movie.id}/>`}
        
    })
}

function createNewMovieContainer(movies){
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class', 'movie')

    const movieTemplate = `
        <section class="section"> 
            ${movieSection(movies)}
        </section>
    
    `
    movieElement.innerHTML = movieTemplate
    return movieElement
}

function renderSearchMovies(data){
    moviesSearchable.innerHTML = ''
        const movies = data.results
        const movieBlock = createNewMovieContainer(movies)
        moviesSearchable.appendChild(movieBlock)
        console.log(data)
}

buttonElement.onclick = function(event){
    event.preventDefault()
    const value = inputElement.value
    const newUrl = url + '&query=' + value


    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((err) => {
            console.log(err)
        })
    console.log(value)
}
