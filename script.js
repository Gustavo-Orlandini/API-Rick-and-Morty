
var formulario = document.querySelector('form')
formulario.addEventListener('submit', buscar)

let urlForm = "https://rickandmortyapi.com/api/character"

let nome = document.getElementById('name')

let res = document.getElementById('res')
let radioImage = document.getElementById('image')
let radioSpecies = document.getElementById('species')
let radioStatus = document.getElementById('status')
let radioGender = document.getElementById('gender')
let radioEpisodes = document.getElementById('episodes')

function preencheTela(json) {
    res.innerHTML = ''
    json.results.map(function(results) {
        
        let onlyNumbers = results.episode.map( str => str.replace(/[^0-9]/g, '')) 
        // onlyNumbers vai excluir tudo o que for DIFERENTE (^) de 0-9 (ou seja, que não for número)...o "g" significa "global"
        const divPai = document.createElement('div')
        divPai.classList.add('item')
        const hr = document.createElement('hr')

        if (radioImage.checked) {
            const div = document.createElement('div')
            div.setAttribute('id', 'resimg')

            const img = document.createElement('img')
            img.setAttribute('src', results.image)

            div.appendChild(img);

            divPai.appendChild(div);
        }

        const outroNome = document.createElement('p')
            outroNome.innerHTML = "Nome: " + results.name
            divPai.appendChild(outroNome)

        if (radioSpecies.checked) {
            const especie = document.createElement('p')
            especie.innerHTML = "Espécie: " + results.species
            divPai.appendChild(especie)
        }

        if (radioStatus.checked) {
            const statuus = document.createElement('p')
            statuus.innerHTML = "Status: " + results.status
            divPai.appendChild(statuus)
        }

        if (radioGender.checked) {
            const gendeer = document.createElement('p')
            gendeer.innerHTML = "Gênero: " + results.gender
            divPai.appendChild(gendeer)
        }

        if (radioEpisodes.checked) {
            const epis = document.createElement('p')
            epis.innerHTML = "Episódios: " + onlyNumbers.join(', ')
            divPai.appendChild(epis)
        }

        res.appendChild(divPai)
        res.appendChild(hr)

   
    })
}

function buscar(e) {
    let valor = nome.value
        e.preventDefault()
           
        fetch(`${urlForm}?name=${valor}`)
            .then(response => response.json())
            .then(json => preencheTela(json));
        
}

const apiRick=async (pagina) => {
    let valor = nome.value
    let url = `${urlForm}?page=${pagina}&name=${valor}`;
    fetch(url)
    .then(response => response.json())
    .then(preencheTela);

}

// ==================================================
// FUNÇÃO PARA O CURSOS DO MOUSE

var bolinha = document.querySelector('.cursor');

document.addEventListener('mousemove', function(m) {
    let xPos = m.pageX - 10; // -10 para centralizar pq a div tem 20px de tamanho
    let yPos = m.pageY - 10;

    bolinha.style.left = xPos + 'px';
    bolinha.style.top = yPos + 'px';
});

bolinha.addEventListener('click', function() {
    this.classList.add('cursor-expand')

    setTimeout(function() {
        bolinha.classList.remove('cursor-expand')
    }, 400);
})
