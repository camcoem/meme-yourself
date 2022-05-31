const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
    "X-RapidAPI-Key": "a523177b00mshd550b0cc2a61c10p1feac7jsn678482fe3bb0",
  },
};

const meme = "Advice-Yoda";


function generateMeme() {
  const topText = document.getElementById("topText").value; //to get the input from the user
  const bottomText = document.getElementById("bottomText").value;
  const fontSize = document.getElementById("fontSize").value;

  fetch(
    `https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=${meme}&bottom=${bottomText}&top=${topText}&font_size=${fontSize}`,
    options
  )
    .then((response) => response.blob())
    .then((response) => {
      return new Promise((resolve) => {
        var reader = new FileReader(); //converts bynary in base64
        reader.readAsDataURL(response); // read this bynary as DataURL
        reader.onloadend = function () {
          var base64data = reader.result;
          resolve(base64data);
        };
      });
    })
    .then((response) => {
      const img = document.createElement("img");
      img.src = `${response}`;
      if (document.querySelector("img") !== null ) {
        document.querySelector("img").remove()
      }
      document.body.appendChild(img);
    })
    .catch((err) => console.error(err));
}

//gallery below

function generateGallery() {
  fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options)
    .then((response) => response.json())
    .then((response) => {
      //     //const images = response.map((meme) =>`<img src='http://apimeme.com/thumbnail?name=${meme}' />`);
      response.forEach((meme) => {
        const img = document.createElement("img");
        img.src = `http://apimeme.com/thumbnail?name=${meme}`;
        document.body.appendChild(img); //append by ID, to the gallery page
      });
      //     //document.body.innerHTML=images.join('') // innerHTML might not be the best choice as there are some security flaws SQLi XSS
    })
    .catch((err) => console.error(err));
}


// fetch('https://ronreiter-meme-generator.p.rapidapi.com/images', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));



// var select = document.getElementById("selectNumber");
// var options = ["1", "2", "3", "4", "5"];

// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// }
// <select id="selectNumber">
//     <option>Choose a number</option>
// </select>