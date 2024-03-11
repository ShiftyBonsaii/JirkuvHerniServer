
console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);

document.addEventListener('DOMContentLoaded', function() {
  var header = document.getElementById('myHeader');
  var page = document.getElementById('page');
  var openMenuButton = document.getElementById('openmenu'); 

  window.addEventListener('scroll', function() {
      page.classList.remove('menuopen');
      if (window.scrollY >= 100) {
          header.classList.add('sticky');
      } else {
          header.classList.remove('sticky');
      }
  });


  openMenuButton.addEventListener('click', function() {
      header.classList.remove('sticky');
      page.classList.add('menuopen');
  });

var links = document.querySelectorAll('a[href^="#"]');

  links.forEach(function(link) {
      link.addEventListener('click', function(event) {

          event.preventDefault();


          var targetId = this.getAttribute('href');
          var targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
          }
      });
  });
});