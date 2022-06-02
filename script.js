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
      if (document.querySelector("img") !== null) {
        document.querySelector("img").remove();
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
      response.forEach((meme) => {
        const img = document.createElement("img");
        img.src = `http://apimeme.com/thumbnail?name=${meme}`;
        // img.classList.add("card");
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        //document.getElementById("gallery").appendChild(img); //append by ID, to the gallery page
        document
          .getElementById("gallery")
          .appendChild(divCard)
          .appendChild(img);
      });
    });
  //.catch((err) => console.error(err));
}

function arrayImg() {
  const imgNames = [];
  var select = document.getElementById("selectImg");

  fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options)
    .then((response) => response.json())
    .then((response) => {
      let arrayJson = response;
      imgNames.push(arrayJson);

      for (var i = 0; i < imgNames.length; i++) {
        var opt = imgNames[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    })
    .catch((err) => console.error(err));
}
