export function cssClassTogler(element, firstClass, secondClass) {
    return () => {
      if (element.classList.contains(firstClass)) {
        element.classList.replace(firstClass, secondClass);
        return;
      }
  
      if (element.classList.contains(secondClass)) {
        element.classList.replace(secondClass, firstClass);
        return;
      }
    };
  }