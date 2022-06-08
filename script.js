const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
    "X-RapidAPI-Key": "a523177b00mshd550b0cc2a61c10p1feac7jsn678482fe3bb0",
  },
};

//const meme = "Advice-Yoda";
function generateMeme(type) {
  const meme1 = document.getElementById("selectImg");
  const meme = meme1.options[meme1.selectedIndex].value;
  const topText = document.getElementById("topText").value; //to get the input from the user
  const bottomText = document.getElementById("bottomText").value;
  const fontSize = document.getElementById("fontSize").value;
  let link= '';

type === 'random' ?
 link = `https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=${ }&bottom=${bottomText}&top=${topText}&font_size=${fontSize}` :
  link = `https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=${meme}&bottom=${bottomText}&top=${topText}&font_size=${fontSize}`;


  fetch(
   link,
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
      img.classList.add("memeRightSide");
      if (document.querySelector("img") !== null) {
        document.querySelector("img").remove();
      }

      document.getElementById("memeImg").appendChild(img);
    })
    .catch((err) => console.error(err));
}
generateMeme('random')
//gallery below

function generateGallery() {
  fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options)
    .then((response) => response.json())
    .then((response) => {
      response.forEach((meme) => {
        const img = document.createElement("img");
        img.src = `http://apimeme.com/thumbnail?name=${meme}`;

        const divCard = document.createElement("div");
        divCard.classList.add("card");
        document
          .getElementById("gallery")
          .appendChild(divCard)
          .appendChild(img);

        const txt = document.createElement("span");
        txt.style.textAlign = "center";

        txt.innerHTML = meme;
        if (img.nextSibling) {
          img.parentNode.insertBefore(txt, img.nextSibling);
        } else {
          img.parentNode.appendChild(txt);
        }
      });
    });
  //.catch((err) => console.error(err));
}

let arrayJson = [];

fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options)
  .then((response) => response.json())
  .then((response) => {
    arrayJson = response;
  })
  .catch((err) => console.error(err));

function arrayImg() {
  var select = document.getElementById("selectImg");

  for (var i = 0; i < 50; i++) {
    var opt = arrayJson[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}
function randomMemeImg() {
  let test = arrayJson;
  // fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options) //from arrayImg()
  //   .then((response) => response.json())
  //   .then((response) => {
  let randomImg = test.sort(() => 0.5 - Math.random())[0];
  console.log(randomImg);

  //let randomImgName = randomImg.sort(() => 0.5 - Math.random())[0];
  // })

  //.then((randomImgName) => {
  const img = document.createElement("img");
  img.src = `http://apimeme.com/thumbnail?name=${randomImg}`;
  if (document.querySelector("img") !== null) {
    document.querySelector("img").remove();
  }

  document.getElementById("memeImg").appendChild(img);
  // });
}
