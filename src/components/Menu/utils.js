export const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

const preventScroll = e => e.preventDefault();

export const setDocumentElementStyles = isOpen => {
  document.body.style.paddingRight = isOpen ? `${getScrollbarWidth()}px` : 0;
  document.body.style.overflow = isOpen ? "hidden" : "auto";
  if (isOpen) {
    window.addEventListener("scroll", preventScroll);
  } else {
    window.removeEventListener("scroll", preventScroll);
  }
};
