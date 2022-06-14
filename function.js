const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '79c1399bb4msh98f55315e3d967cp1c0c75jsnaaf3c0300f3b',
		'X-RapidAPI-Host': 'spotify-monthly-listeners.p.rapidapi.com'
	},
};

const options_ = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '79c1399bb4msh98f55315e3d967cp1c0c75jsnaaf3c0300f3b',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

function getList(){
    fetch('https://spotify-monthly-listeners.p.rapidapi.com/', options)
	.then(response => response.json())
	.then(response => viewList(response))
	.catch(err => console.error(err));

   
}

function viewList(list){
    console.log(list)
    
    let lis = document.querySelectorAll('td');

    for(let i = 0; i < 10; i++){
        let art = (list[i].artist).split(" ").join("")
        console.log(list[i])
        lis[i].innerHTML = i+1+". " + list[i].artist + " - <span class='sub'>"+list[i].monthlyListeners+"M"+" monthly listeners</span> ";
        //photo(art, lis[i])
		
		if(i < 6){
			enlace(art, lis[i])
		}
    }
}

function photo(artist, li){
    let url = "";

    fetch(`https://spotify23.p.rapidapi.com/search/?q=${artist}&type=multi&offset=10&limit=10&numberOfTopResults=1`, options_)
	.then(response => response.json())
	.then(response => 

		li.innerHTML += `<img src="${response.albums.items[0].data.coverArt.sources[0].url}" width="150px">`
        )
	.catch(err => console.error(err));
}

function enlace(artist, li){
    let url = "";

	fetch(`https://spotify23.p.rapidapi.com/search/?q=${artist}&type=artists&offset=0&limit=10&numberOfTopResults=5`, options_)
	.then(response => response.json())
	.then(response => 
		li.innerHTML += `
		
		<a href="${response.artists.items[0].data.uri}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a> 
		
		`,
		//li.innerHTML += `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/${convertUri(response.artists.items[0].data.uri)}?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
	)
	.catch(err => console.error(err));
}

let date = new Date();
let day = `0${date.getDate()}`.slice(-2); //("0"+date.getDate()).slice(-2);
let year = date.getFullYear();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month_ = month[date.getMonth()];

document.getElementById("date").innerHTML = `${month_}, ${year}`
getList();

function convertUri(uri){
	return uri;
}


