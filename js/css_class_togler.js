export function ClassToggler(element, firstClass, secondClass) {
  return () => {
    if (element.classList.contains(firstClass)) {
      element.classList.replace(firstClass, secondClass);
      return;
    }

    element.classList.replace(secondClass, firstClass);
    return;
  };
}
