/****
 * Wrap up all script inside Immediately Invoked Function Expression for avoiding To avoid the conflict of variables
 */

(function () {
  /***
    * 1. Process images from API and render,
    Create containers for images and loading animation
    Створюємо  контейнери для картинок і лоадінг анімацйії
  ***/
  const imgContainer = document.querySelector(".dj-cards-container");
  const loader = document.querySelector(".dj-loader");

  /***
    Get images and append to container
    Витягнути картинки з API та вставити в контейнер
  ***/
  const getImages = async (page, limit) => {
    //The images comes from an API
    const apiURL = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

    const response = await fetch(apiURL);

    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }

    // returns promise that resolves to JSON
    const imgData = await response.json();
    return imgData;
  };

  const showImages = (images) => {
    images.forEach((image) => {
      const imgWrapper = document.createElement("section");
      imgWrapper.classList.add("dj-image-wrapper");

      //Create set of texts different length
      const texts = [
        "What is that feeling when you're driving away from people and they recede on the plain till you see their specks dispersing? - it's the too-huge world vaulting us, and it's good-bye. But we lean forward to the next crazy venture beneath the skies.",
        "I was surprised, as always, by how easy the act of leaving was, and how good it felt. The world was suddenly rich with possibility.",
        "I realized these were all the snapshots which our children would look at someday with wonder, thinking their parents had lived smooth, well-ordered lives and got up in the morning to walk proudly on the sidewalks of life, never dreaming the raggedy madness and riot of our actual lives, our actual night, the hell of it, the senseless emptiness.",
        "I woke up as the sun was reddening; and that was the one distinct time in my life, the strangest moment of all, when I didn't know who I was - I was far away from home, haunted and tired with travel, in a cheap hotel room I'd never seen, hearing the hiss of steam outside, and the creak of the old wood of the hotel, and footsteps upstairs, and all the sad sounds, and I looked at the cracked high ceiling and really didn't know who I was for about fifteen strange seconds. I wasn't scared; I was just somebody else, some stranger, and my whole life was a haunted life, the life of a ghost",
        "Will you love me in December as you do in May?",
        "I had nothing to offer anybody except my own confusion.",
        "My witness is the empty sky",
        "My whole wretched life swam before my weary eyes, and I realized no matter what you do it's bound to be a waste of time in the end so you might as well go mad.",
      ];

      //Pick up random text
      let randomIndexText = Math.floor(Math.random() * texts.length);

      //Markup for separate card
      imgWrapper.innerHTML = `        
        <div class="card">
          <img
            src="${image.download_url}"
            class="dj-card-img-top"
            alt="${image.author}"
          />
          <div class="card-body">
            <h2 class="card-title">${image.id} ${image.author}</h2>
            <p class="card-text">${texts[randomIndexText]}
            </p>
            <a href="" class="dj-link-more">Show more...</a>
            <div class="dj-buttons-wrapper">
              <a href="#" class="btn btn-primary">Save to collection</a>
              <a href="#" class="btn dj-btn-outline">Share</a>
            </div>
          </div>
        </div>
      `;

      /****
       2. Functionality to truncate text on second row and show 'Show more' button
      */

      //Get set of text boxes from cards
      let cardTexts = document.getElementsByClassName("card-text");

      for (let i = 0; i < cardTexts.length; i++) {
        //Get styles of current element
        const style = getComputedStyle(cardTexts[i]);

        //Get line height of current element
        const textLineHeight = style.lineHeight;

        //Parse line height it into number
        const textLineHeightToNumber = Number.parseInt(textLineHeight);

        //Set number of rows after which truncate text
        const numberOfLines = 2;

        //Calculate max height in px for text block
        let maxTextHeight = textLineHeightToNumber * numberOfLines;

        //Calculate real height in px for current text block
        let currentTextHeight = cardTexts[i].offsetHeight;

        //If current height of text block is more than max height, add css class which hides text and shows button 'Show more'
        if (currentTextHeight > maxTextHeight) {
          cardTexts[i].classList.toggle("dj-show-more");
        }
      }

      /****
       * Toggle text functionality
       */

      //Get set of all 'Show more' buttons on the page
      let showMoreButtons = document.getElementsByClassName("dj-link-more");

      for (let i = 0; i < showMoreButtons.length; i++) {
        showMoreButtons[i].addEventListener("click", function (e) {
          //Get text in the current block and toggle show hide full text
          let textBlock = showMoreButtons[i].previousElementSibling;
          textBlock.classList.toggle("dj-full-text");

          //Toggle text inside 'show' button
          showMoreButtons[i].innerHTML =
            showMoreButtons[i].innerHTML == "Show more..."
              ? "...Show less"
              : "Show more...";
        });
      }

      imgContainer.appendChild(imgWrapper);
    });
  };

  const hideLoader = () => {
    loader.classList.remove("show");
  };

  const showLoader = () => {
    loader.classList.add("show");
  };

  let currentPage = 1;
  const limit = 10;

  // load images
  const loadImages = async (page, limit) => {
    // show the loader
    showLoader();

    // 0.5 second delay, to make loading more visible
    setTimeout(async () => {
      try {
        // call the API to get images
        const response = await getImages(page, limit);

        // show images
        showImages(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 500);
  };

  /***
    Listen to scroll event and load more images when we get to the bottom of the page
    'Зловити' Scroll event та загрузити більше картинок коли досягли нижнього краю сторінки
  ***/
  window.addEventListener(
    "scroll",
    () => {
      //creating set of variables from documentElement object
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight > scrollHeight) {
        currentPage++;
        loadImages(currentPage, limit);
      }
    },
    {
      passive: true,
    }
  );

  // initial images loading
  loadImages(currentPage, limit);

  /***
    Swither for themes
  ***/
  const page = document.querySelector(".page");
  const switcherToDarkTheme = document.querySelector(".dj-btn-to-dark");
  const switcherToLightTheme = document.querySelector(".dj-btn-to-light");

  switcherToDarkTheme.addEventListener("click", function (e) {
    page.classList.add("dark-theme");
  });
  switcherToLightTheme.addEventListener("click", function (e) {
    page.classList.remove("dark-theme");
  });
})();
