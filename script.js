options.headers;

let arrayJson = [];

fetch("https://ronreiter-meme-generator.p.rapidapi.com/images", options)
  .then((response) => response.json())
  .then((response) => {
    arrayJson = response;
  })
  .catch((err) => console.error(err));

function generateMeme(memePicture) {
  const topText = document.getElementById("topText").value; //to get the input from the user
  const bottomText = document.getElementById("bottomText").value;
  const fontSize = document.getElementById("fontSize").value;

  fetch(
    `https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=${memePicture}&bottom=${bottomText}&top=${topText}&font_size=${fontSize}`,
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

document.getElementById("notRandom").addEventListener("click", () => {
  const meme1 = document.getElementById("selectImg");
  const meme = meme1.options[meme1.selectedIndex].value;

  generateMeme(meme);
});

document.getElementById("random").addEventListener("click", () => {
  let randomImg = arrayJson.sort(() => 0.5 - Math.random())[0];
  generateMeme(randomImg);
});
//gallery below

function generateGallery() {
  arrayJson.forEach((memeThumb) => {
    const img = document.createElement("img");
    img.src = `http://apimeme.com/thumbnail?name=${memeThumb}`;

    const divCard = document.createElement("div");
    divCard.classList.add("card");
    document.getElementById("gallery").appendChild(divCard).appendChild(img);

    const txt = document.createElement("span");
    txt.style.textAlign = "center";

    txt.innerHTML = memeThumb;
    if (img.nextSibling) {
      img.parentNode.insertBefore(txt, img.nextSibling);
    } else {
      img.parentNode.appendChild(txt);
    }
  });

  //.catch((err) => console.error(err));
}

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
