document.addEventListener("DOMContentLoaded", function(){
    let connexion = new MovieDB();
    connexion.requeteDernierFilm();
})


class MovieDB{

    constructor() {
        console.log("Constructeur");
        this.APIkey = "69ba25d3037b75029471e1ccac5cc813";
        this.lang = "fr-CA";
        this.baseURL = "https://api.themoviedb.org/3";
        this.imgPath = "https://image.tmdb.org/t/p/";
        this.totalFilm = 8;

    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this) );
        //requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=eda01ad95b124c2be1b5f4308d87648f&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");
        requete.send();

    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier Film");
        let target = e.currentTarget;
        let data;
        //console.log(target.responseText);
        data = JSON.parse(target.responseText).results;
        console.log(data);
        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){

        let section = document.querySelector('.liste-films');
        console.log(section)

        for (let i = 0; i < this.totalFilm; i++) {
            // console.log(data[i].title);
            // console.log(data[i].overview);
            let article = document.querySelector('.template .film').cloneNode(true);
            article.querySelector('h2').innerHTML = data[i].title;
            article.querySelector('.description').innerHTML = data[i].overview;

            // if(data[i].overview != ""){
            //     article.querySelector('.description').innerHTML = data[i].overview;
            // }
            // else{
            //     article.querySelector('.description').innerHTML = "Aucune description";
            // }

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description";
            let image = article.querySelector('img');
            image.src = this.imgPath + "w300" + data[i].poster_path;

            section.appendChild(article);
        }


    }


}

