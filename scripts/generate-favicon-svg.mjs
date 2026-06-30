import fs from "fs";

const black = fs.readFileSync("public/assets/nimus-black-icon.png").toString("base64");
const white = fs.readFileSync("public/assets/nimus-white-icon.png").toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30">
  <style>
    .light { display: block; }
    .dark { display: none; }
    @media (prefers-color-scheme: dark) {
      .light { display: none; }
      .dark { display: block; }
    }
  </style>
  <image class="light" width="32" height="30" href="data:image/png;base64,${black}"/>
  <image class="dark" width="32" height="30" href="data:image/png;base64,${white}"/>
</svg>`;

fs.writeFileSync("public/assets/favicon.svg", svg);
fs.writeFileSync("app/icon.svg", svg);
console.log("Generated favicon.svg");
