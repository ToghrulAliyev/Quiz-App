const pages = document.querySelectorAll(".page");
let currentPage = 0;

function nextPage() {
  pages[currentPage].classList.remove("page--current");
  pages[currentPage].classList.add("page--prev");
  currentPage++;
  if (currentPage >= pages.length) {
    currentPage = 0;
  }
  pages[currentPage].classList.add("page--next");
  setTimeout(() => {
    pages[currentPage].classList.remove("page--next");
    pages[currentPage].classList.add("page--current");
    console.log(pages[(currentPage + pages.length - 1) % pages.length] );
    pages[(currentPage + pages.length - 1) % pages.length].classList.add(
      "page--hidden"
    );
  }, 800);
  // window.history.pushState({ page: currentPage }, '', `page${currentPage + 1}`);
}

function prevPage() {
  pages[currentPage].classList.remove('page--current');
  pages[currentPage].classList.add('page--next');
  pages[(currentPage + pages.length - 1) % pages.length].classList.remove('page--hidden');
  currentPage--;
  if (currentPage < 0) {
    currentPage = pages.length - 1;
  }
  pages[currentPage].classList.add('page--prev');
  setTimeout(() => {
    pages[currentPage].classList.remove('page--prev');
    pages[currentPage].classList.add('page--current');
  }, 50);
  // window.history.pushState({ page: currentPage }, '', `page${currentPage + 1}`);
  // if (currentPage === 0) {
  //   document.getElementById('page2').style.display = 'none';
  // }
}

window.addEventListener("popstate", (event) => {
  const page = event.state?.page || 0;
  pages[currentPage].classList.remove("page--current");
  pages[currentPage].classList.add(
    page > currentPage ? "page--prev" : "page--next"
  );
  pages[(currentPage + pages.length - 1) % pages.length].classList.remove(
    "page--hidden"
  );
  currentPage = page;
  pages[currentPage].classList.remove(
    page > currentPage ? "page--next" : "page--prev"
  );

  pages[currentPage].classList.add("page--current");
});


