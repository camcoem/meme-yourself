const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "ronreiter-meme-generator.p.rapidapi.com",
    "X-RapidAPI-Key": "a523177b00mshd550b0cc2a61c10p1feac7jsn678482fe3bb0",
  },
};

const meme = "Advice-Yoda";

//const fontsize = 14;

function generateMeme() {
  const topText = document.getElementById("topText").value; //to get the input from the user
  const bottomText = document.getElementById("bottomText").value;

  fetch(
    `https://ronreiter-meme-generator.p.rapidapi.com/meme?meme=${meme}&bottom=${bottomText}&top=${topText}`,
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
      document.body.appendChild(img); //removed innerHTML due to best practices
      // (document.getElementById(
      //   "memeImg"
      // ).innerHTML = `<img src='${response}'/>`)
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
