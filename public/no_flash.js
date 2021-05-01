(function() {
  var storageKey = 'darkMode';
  var classNameDark = 'dark';
  var classNameLight = 'light';
  var element = document.documentElement;

  var useDark;
  try {
    useDark = JSON.parse(localStorage.getItem(storageKey));
  } catch (err) {
    useDark = window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : element.classList.contains(classNameDark);
    try {
      localStorage.setItem(storageKey, JSON.stringify(useDark))
    } catch (err) {
      // No-op
    }
  }

  element.classList.add(useDark ? classNameDark : classNameLight);
  element.classList.remove(useDark ? classNameLight : classNameDark);
})();
