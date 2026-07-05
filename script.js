const colors = {
    'Action': 'orange',
    'Comedy': 'yellow',
    'Horror':'red',
    'Crime': 'grey',
    'Romance': 'pink',
    'Mystery':'purple',
    'Thriller':'white',
    'Adventure': 'green',
    'Family': 'cyan',
    'Animation': 'magenta',
    'Science Fiction': 'blue',
}
favorite = JSON.parse(localStorage.getItem('favorite')) || [];
let movies = {
    apiKey1: "e3d79aa31ad8c54a140d450ea327ac5b",
    fetchMovies: function(movie) {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=" + this.apiKey1)
            .then((response) => {
                if (!response.ok){
                    alert('Movies not found');
                    return;
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('favorite', JSON.stringify(favorite));
                console.log(data);
                this.displayMovies(data);
            });
    },
    displayMovies: function(movies) {
        const main = document.querySelector(".movie-container");
        const imagebase = "https://image.tmdb.org/t/p/w500"; 
        const movieList = movies.results ; 

        movieList.forEach((movie) => {                       
            const card = document.createElement("div");
            card.classList.add("moviecard");
            card.innerHTML = `
        <div class="allcontainer">
            <div class="imgcontainer">
                <img class="movieposter" src="${imagebase}${movie.poster_path}" alt="${movie.title}">
                <div class="hovermovie">
                    <div class="playmovie"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>
                    </div>
                </div>
                <div class="info">
                    <h2>${movie.title}</h2>
                    <div class="moreinfo">

                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                            </svg> ${movie.release_date.split('-')[0]}</p>

                            <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg> ${movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            </div>
                <div class="btns">
                        <button class="btn fav"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg></button>


                        <button class="btn save"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                        </svg></button>
                </div>
        </div>    
            `;
            card.querySelector('.save').addEventListener('click', ()=>{
                this.saveWatchlist(movie);
                alert('Added to Watchlist')
            })
            card.querySelector('.imgcontainer').addEventListener('click', () => {
                this.getMovieDetails(movie.id);
            });
            card.querySelector('.fav').addEventListener('click',()=>{
                console.log('hello');
                this.saveFavorite(movie);
                alert('Added to Favorites!');
            })
            main.appendChild(card);
        });
    },
    saveWatchlist : function(movie){
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (movie){
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
        if (watchlist.length == 0){
            document.querySelector('#watchlist').innerHTML = `<h1 style="margin-left:60px" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                 <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                </svg> Your Watchlist</h1>
            <div style="width:100%; text-align:center; letter-spacing:2px">
                <div style="width:80px; height: 80px ; border-radius : 50%; background: #709fcc; margin-left:48%; opacity:0.8"><svg style="margin-top:30px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
                     <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
                    </svg>
                </div>
                <h3 style="font-size:25px">Your Watchlist is empty!</h3>
                <button class="removebtn" id="browse2" >Browse Movies</button>
            </div>`;

            document.getElementById('browse2').addEventListener('click', function(){
                document.getElementById('home').style.display = "block";
                document.getElementById('watchlist').style.display = "none";
                document.getElementById('favorites').style.display = "none";
                document.getElementById('firstbtn').classList.add('bar');
                document.getElementById('secondbtn').classList.remove('bar');
                });
                return
        }
        const mywatchlist = document.querySelector('#watchlist');
        mywatchlist.innerHTML = "";
        watchlist.forEach(function(watch){
        const Allcontainer = document.createElement('div');
        const imagecontainer = document.createElement('div');
        const infoo = document.createElement('div');
        const poster = document.createElement('img');
        const moreinfo = document.createElement('div');
        const removebtn = document.createElement('button');

        removebtn.classList.add ('removebtn');
        Allcontainer.classList.add('moviecard');
        imagecontainer.classList.add('imgcontainer');
        infoo.classList.add('info');
        poster.classList.add('movieposter');
        moreinfo.classList.add('moreinfo');
        removebtn.innerHTML = "Remove From Watchlist";
        const hovermovies = document.createElement('div');
        const playvid = document.createElement('div');
        playvid.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>`
        playvid.classList.add('playmovie');    
        hovermovies.classList.add('hovermovie');                
        const imagebase = "https://image.tmdb.org/t/p/w500";
        infoo.innerHTML = `<h2>${watch.title}</h2>`;
        poster.src = imagebase + watch.poster_path ;
        moreinfo.innerHTML = `<p>${watch.release_date.split('-')[0]}</p>
                    <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg> ${watch.vote_average.toFixed(1)}</p>`

        removebtn.addEventListener('click', ()=>{
            watchlist = watchlist.filter(w => w.id != watch.id);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            Allcontainer.remove();
            if (watchlist.length == 0){
            document.querySelector('#watchlist').innerHTML = `<h1 style="margin-left:60px" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                    </svg> Your Watchlist</h1>
                    <div style="width:100%; text-align:center; letter-spacing:2px">
                             <div style="width:80px; height: 80px ; border-radius : 50%; background: #709fcc; margin-left:48%; opacity:0.8"><svg style="margin-top:30px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
                                </svg>
                             </div>
                        <h3 style="font-size:25px">Your Watchlist is empty!</h3>
                        <button class="removebtn" id="browse2" >Browse Movies</button>
                    </div>`;

            document.getElementById('browse2').addEventListener('click', function(){
                document.getElementById('home').style.display = "block";
                document.getElementById('watchlist').style.display = "none";
                document.getElementById('favorites').style.display = "none";
                document.getElementById('firstbtn').classList.add('bar');
                document.getElementById('secondbtn').classList.remove('bar');
            });
        }
        })  
        imagecontainer.addEventListener('click', () => {
            document.getElementById('watchlist').style.display = 'none';
            document.getElementById('home').style.display = 'block';
            movies.getMovieDetails(watch.id);
            document.getElementById('firstbtn').classList.add('bar');
            document.getElementById('secondbtn').classList.remove('bar');
        }) 
        imagecontainer.appendChild(poster);
        hovermovies.appendChild(playvid);
        imagecontainer.appendChild(hovermovies);
        infoo.appendChild(moreinfo);
        Allcontainer.appendChild(imagecontainer);
        Allcontainer.appendChild(infoo);
        Allcontainer.appendChild(removebtn);
               
        mywatchlist.appendChild(Allcontainer)
        })
    },
    saveFavorite: function(movie){
        let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
        if (movie){
            favorite.push(movie);
            localStorage.setItem('favorite', JSON.stringify(favorite));
        }
        if (favorite.length == 0){
            document.querySelector('#favorites').innerHTML = `<h1 style="margin-left:60px" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                    </svg> Your Favorites</h1>
                     <div style="width:100%; text-align:center; letter-spacing:2px">
                            <div style="width:80px; height: 80px ; border-radius : 50%; background: #709fcc; margin-left:48%; opacity:0.5"><svg style="margin-top:30px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
                                </svg>
                            </div>
                        <h3 style="font-size:25px">No Favorites Yet!</h3>
                        <button class="removebtn" id="browse" >Browse Movies</button>
                    </div>`;
            document.getElementById('browse').addEventListener('click', function(){
            document.getElementById('home').style.display = "block";
            document.getElementById('watchlist').style.display = "none";
            document.getElementById('favorites').style.display = "none" ;
            document.getElementById('firstbtn').classList.add('bar');
            document.getElementById('thirdbtn').classList.remove('bar');
        })
        return;  
        } 
        const favorites = document.querySelector('#favorites');
        favorites.innerHTML = "";
        favorite.forEach(function(fav){
        const Allcontainer = document.createElement('div');
        const imagecontainer = document.createElement('div');
        const infoo = document.createElement('div');
        const poster = document.createElement('img');
        const moreinfo = document.createElement('div');
        const removebtn = document.createElement('button');
        removebtn.classList.add ('removebtn');
        Allcontainer.classList.add('moviecard');
        imagecontainer.classList.add('imgcontainer');
        infoo.classList.add('info');
        poster.classList.add('movieposter');
        moreinfo.classList.add('moreinfo');
        removebtn.innerHTML = "Remove From Favorites";
        const hovermovies = document.createElement('div');
        const playvid = document.createElement('div');
        playvid.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                            </svg>`
        playvid.classList.add('playmovie');    
        hovermovies.classList.add('hovermovie'); 
        const imagebase = "https://image.tmdb.org/t/p/w500";
        infoo.innerHTML = `<h2>${fav.title}</h2>`;
        poster.src = imagebase + fav.poster_path ;
        moreinfo.innerHTML = `<p>${fav.release_date.split('-')[0]}</p>
                    <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg> ${fav.vote_average.toFixed(1)}</p>`
        removebtn.addEventListener('click', ()=>{
            favorite = favorite.filter(f => f.id != fav.id);
            localStorage.setItem('favorite', JSON.stringify(favorite));
            Allcontainer.remove()
            if (favorite.length == 0){
                document.querySelector('#favorites').innerHTML = `<h1 style="margin-left:60px" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg> Your Favorites</h1>
                        <div style="width:100%; text-align:center; letter-spacing:2px">
                            <div style="width:80px; height: 80px ; border-radius : 50%; background: #709fcc; margin-left:48%; opacity:0.8"><svg style="margin-top:30px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-balloon-heart" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063q.068.062.132.129.065-.067.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398"/>
                                    </svg>
                            </div>
                            <h3 style="font-size:25px">No Favorites Yet!</h3>
                            <button class="removebtn" id="browse" >Browse Movies</button>
                        </div>`;
            document.getElementById('browse').addEventListener('click', function(){
                document.getElementById('home').style.display = "block";
                document.getElementById('watchlist').style.display = "none";
                document.getElementById('favorites').style.display = "none" ;
                document.getElementById('firstbtn').classList.add('bar');
                document.getElementById('thirdbtn').classList.remove('bar');
        })  
        }
        })      
        imagecontainer.addEventListener('click', () => {
            document.getElementById('home').style.display = 'block';
            movies.getMovieDetails(fav.id);
            document.getElementById('firstbtn').classList.add('bar');
            document.getElementById('thirdbtn').classList.remove('bar');
        })
        imagecontainer.appendChild(poster);
        hovermovies.appendChild(playvid);
        imagecontainer.appendChild(hovermovies);
        infoo.appendChild(moreinfo);
        Allcontainer.appendChild(imagecontainer);
        Allcontainer.appendChild(infoo);
        Allcontainer.appendChild(removebtn);
        favorites.appendChild(Allcontainer)
        })
    },
    getMovieDetails :function(id){
        fetch("https://api.themoviedb.org/3/movie/"+ id +"?api_key="+this.apiKey1+"&append_to_response=videos,credits,reviews")
            .then((response2)=>{
            if (!response2.ok){
                alert('Not Available');
                return 
            }
            return response2.json()
        })
        .then((data)=>{
            console.log(data);
            this.displayInfo(data)
        })
    },
    displayInfo: function(data){
        const main = document.querySelector(".movie-container");
        const gobackbtn = document.createElement('button');
        main.innerHTML = "";
        fetch("https://api.themoviedb.org/3/movie/"+ data.id + "/recommendations?api_key="+this.apiKey1)
        .then((response)=>{
            if(!response.ok){
                alert('Not Available');
                return;
            } return response.json()
        })
        .then((datax)=>{
            console.log(datax.results)
            const recommendations = document.createElement('div');
            recommendations.classList.add('cast');
            recommendations.innerHTML = '';
            const recommendedlist = datax.results.slice(0,4);
            recommendedlist.forEach((film)=>{
                const myrecommendation = document.createElement('div');
                myrecommendation.classList.add('moviecard')
                myrecommendation.innerHTML = 
                `<div class="imgcontainer">    
                        <img class="movieposter" src="https://image.tmdb.org/t/p/w500${film.poster_path}">
                        <div class="hovermovie">
                            <div class="playmovie">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                </svg>
                            </div>
                        </div>
                        <h2>${film.title}</h2>                    
                        <div class="info2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                </svg> ${film.release_date.split('-')[0]}
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>  ${film.vote_average.toFixed(1)}
                            </div>
                        </div> 
                </div>    
                        <div class="btns">
                                <button class="btn fav"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg></button>
                                <button class="btn save"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                </svg></button>
                        </div>`  
                myrecommendation.querySelector(".fav").addEventListener('click',() =>{
                    alert('Added to Favorites');
                    this.saveFavorite(film)
                })
                myrecommendation.querySelector('.save').addEventListener('click', ()=>{
                alert('Added to Watchlist');
                this.saveWatchlist(film)
            })
            myrecommendation.querySelector('.imgcontainer').addEventListener('click', () => {
                this.getMovieDetails(film.id);
            });
            recommendations.appendChild(myrecommendation)
        })
        gobackbtn.classList.add("goback");
        const playbtn = document.createElement('button');
        playbtn.classList.add('playbtn');
        playbtn.innerHTML = `<svg style="margin-right:10px" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
</svg>Watch Trailer `
        playbtn.addEventListener('click', ()=>{
            console.log('clicked');
            const trailerK = data.videos.results[0].key;
            const url = `https://www.youtube.com/watch?v=${trailerK}`
            window.location.href = url
        })
        gobackbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`
        gobackbtn.addEventListener('click', ()=>{
            main.innerHTML = "";
            this.fetchMovies()
        })
        const viewpart = document.createElement('div');
        viewpart.classList.add('viewpart');
        viewpart.innerHTML=`     
            <img class="imgview" src="https://image.tmdb.org/t/p/original${data.backdrop_path}">
            <div class="details">
                <h1 class="bigtext">${data.title}</h1>
                <div class="info2">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                      </svg> ${data.release_date.split('-')[0]}</div>
                       <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>  ${data.vote_average.toFixed(1)}
                       </div>
                    </div>
                </div>    `
                const detailsdiv = viewpart.querySelector('.details');
                detailsdiv.appendChild(playbtn)
                const infodiv = document.createElement('div');
        infodiv.innerHTML=  `
                <h2 style="margin-left:20px"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tv" viewBox="0 0 16 16">
                        <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5M13.991 3l.024.001a1.5 1.5 0 0 1 .538.143.76.76 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.5 1.5 0 0 1-.143.538.76.76 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.5 1.5 0 0 1-.538-.143.76.76 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.5 1.5 0 0 1 .143-.538.76.76 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2"/>
                        </svg> Overview</h2>
                <p style="margin-left:20px">${data.overview}</p>
                <div class="genrecontainer">
                    ${data.genres.map(y=>`<div class="smallgenre" style="color:${colors[y.name]}; border:1px solid ${colors[y.name]}">${y.name}</div>`).join('')}
                </div>
                <h2 style="margin-left:20px"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        </svg> Cast</h2>
                <div class="cast">
                    ${data.credits.cast.slice(0,6).map(x=>`
                        <div class="castcard">
                            <img class="castimg" src="https://image.tmdb.org/t/p/w500${x.profile_path}">
                            <span>${x.name}</span>
                        </div>    
                        `).join('')}
                </div>
            </div>`        
        const reviewdiv = document.createElement('div');
        reviewdiv.classList.add('reviews');
        const review = data.reviews.results;        
        if (data.reviews.results.length > 0){
            const reviews = data.reviews.results.map(review => 
                `<div class="reviewspart">
                <p style="font-size:25px;font-weight = bolder">${review.author}</p>
                <p>${review.content.substring(0, 500)}...</p>
            </div>`).join('');
        reviewdiv.innerHTML = `
        <div class="reviewbtn"><h2 style="font-size:25px; margin-left: 20px; margin-bottom:10px"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope-heart" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l3.235 1.94a2.8 2.8 0 0 0-.233 1.027L1 5.384v5.721l3.453-2.124q.219.416.55.835l-3.97 2.443A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741l-3.968-2.442q.33-.421.55-.836L15 11.105V5.383l-3.002 1.801a2.8 2.8 0 0 0-.233-1.026L15 4.217V4a1 1 0 0 0-1-1zm6 2.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
            </svg> Reviews  </h2><button class="myreview"> Add Review </button>
        </div>
        <p id="removeme"></p>
${reviews}`
        }
        else {
            reviewdiv.innerHTML = `<div class="reviewbtn"><h2 style="font-size:25px; margin-left: 20px; margin-bottom:10px"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-envelope-open-heart" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l3.235 1.94a2.8 2.8 0 0 0-.233 1.027L1 7.384v5.733l3.479-2.087q.224.414.558.83l-4.002 2.402A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738l-4.002-2.401q.334-.418.558-.831L15 13.117V7.383l-3.002 1.801a2.8 2.8 0 0 0-.233-1.026L15 6.217V5.4a1 1 0 0 0-.53-.882zM7.06.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
</svg> Reviews</h2><button class="myreview"> Add Review </button></div>
<h3 id="removeme">No Reviews Yet</h3>` 
        }
        reviewdiv.querySelector('.myreview').addEventListener('click', function(){
                console.log('add btn 2 clicked');
                document.querySelectorAll('.myform').forEach(function(inputs){
                    inputs.value = ""
              })
            document.getElementById('form1').style.display = "flex";
        })
        const newtitle = document.createElement('h2');
        newtitle.innerHTML = `<h2 style="margin-left:20px"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-badge-hd-fill" viewBox="0 0 16 16">
                <path d="M10.53 5.968h-.843v4.06h.843c1.117 0 1.622-.667 1.622-2.02 0-1.354-.51-2.04-1.622-2.04"/>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm5.396 3.001V11H6.209V8.43H3.687V11H2.5V5.001h1.187v2.44h2.522V5h1.187zM8.5 11V5.001h2.188c1.824 0 2.685 1.09 2.685 2.984C13.373 9.893 12.5 11 10.69 11z"/>
                </svg> You Might Also Like</h2>`
        const emptystar = "M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z";
        const fullstar = "M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z";
        let ratings = 0;
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index)=>{
            star.addEventListener('mouseover', ()=>{
                updatestars(index);
            })
            star.addEventListener('click',()=>{
                ratings = index + 1;
                console.log('Rating: ' + ratings)
            })
        })
            document.querySelector('.starscontainer').addEventListener('mouseleave', ()=>{
                updatestars(ratings-1)
            })
            function updatestars(index){
                stars.forEach((star,i)=>{
                    const path = star.querySelector('path');
                    const svg = star.querySelector('svg');
                    if (i <= index ){
                        path.setAttribute('d', fullstar);
                        svg.style.color = 'gold';
                    }else{
                        path.setAttribute('d', emptystar);
                        svg.style.color = 'white'
                    }
                })
            }
        document.getElementById('send').addEventListener('click', function(e){
            e.preventDefault();
            console.log('btn clicked');
            const name = document.getElementById('username').value;
            const review = document.getElementById('userreview').value;
            if (name.trim() ==="" || review.trim() ===""){
                alert('Please fill both sections');   
            }
            else{
            const newreview = document.createElement('div');
            newreview.innerHTML = `<div class="reviewspart">
                    <p style="font-size:25px;font-weight = bolder">${name}</p>
                    <p>${review}</p>
                </div>`
            reviewdiv.appendChild(newreview)
            document.getElementById('form1').style.display = 'none';
            document.getElementById('removeme').style.display = "none";
            }
        })
        viewpart.appendChild(infodiv);
        viewpart.appendChild(gobackbtn);
        viewpart.appendChild(reviewdiv);
        viewpart.appendChild(newtitle)
        viewpart.appendChild(recommendations);
        main.appendChild(viewpart);
        document.getElementById('searchhere').value = "";
    })     
    },
    searchmovie : function(search){
        fetch('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey1 + '&query=' + search)
        .then((response3)=>{
            if (!response3.ok){
                alert('Movie Not Found!');
                return
            }return response3.json()
        })
        .then((data3)=>{
            document.querySelector('.movie-container').innerHTML = "";
            console.log(data3.results);
            movies.displayMovies(data3)
        })
    }
    }
movies.fetchMovies()
document.querySelector('.searchbar input').addEventListener('keyup', function(e){
    if (e.key=='Enter'){
        movies.searchmovie(e.target.value)
    }
}) 
document.querySelectorAll('.titles').forEach(function(btns){
    btns.addEventListener('click',function(){
        document.querySelectorAll('.titles').forEach(function(b){
            b.classList.remove('bar')
        })
        btns.classList.add('bar')
    })
})
document.getElementById('firstbtn').addEventListener('click',function(){
    document.getElementById('home').style.display = "block";
    document.getElementById('watchlist').style.display = "none";
    document.getElementById('favorites').style.display = "none" ;
})
document.getElementById('secondbtn').addEventListener('click',function(){
    document.getElementById('home').style.display = "none";
    document.getElementById('watchlist').style.display = 'flex';
    document.getElementById('favorites').style.display = "none";
    
})
document.getElementById("thirdbtn").addEventListener('click',function(){
    document.getElementById('home').style.display = "none";
    document.getElementById('watchlist').style.display = "none";
    document.getElementById('favorites').style.display = "flex";
})

document.getElementById('browse2').addEventListener('click', function(){
    document.getElementById('home').style.display = "block";
    document.getElementById('watchlist').style.display = "none";
    document.getElementById('favorites').style.display = "none" ;
    document.getElementById('firstbtn').classList.add('bar');
    document.getElementById('secondbtn').classList.remove('bar');

    });
document.getElementById('browse').addEventListener('click', function(){
    document.getElementById('home').style.display = "block";
    document.getElementById('watchlist').style.display = "none";
    document.getElementById('favorites').style.display = "none" ;
    document.getElementById('firstbtn').classList.add('bar');
    document.getElementById('thirdbtn').classList.remove('bar');
    });
movies.saveFavorite()
movies.saveWatchlist()
document.getElementById('form1').querySelector('#out').addEventListener('click', function(){
    console.log('out clicked');
    document.getElementById('form1').style.display = "none";            
})
let loader = document.getElementById('preloader')
window.addEventListener('load',function(){
    loader.style.display = 'none'
})
