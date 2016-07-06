// Helper function to get an element's exact position
export function getElementPosition(el) {
  let xPos = 0;
  let yPos = 0;

  while (el) {
    if (el.tagName === 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

/*
    getScrollLeftOffset (element) {
      let offset = element.offsetLeft;
      let offsetParent = element.offsetParent;
      while (element.parentNode) {
        element = element.parentNode;
        if (element.scrollLeft) {
          offset -= element.scrollLeft;
        }
        if (offsetParent && element === offsetParent) {
          offset += element.offsetLeft;
          offsetParent = element.offsetParent;
        }
      }
      return offset;
    }*/

export function getTouchCoords (evt, offset){
  let x, y, is_touch = (evt.changedTouches)
  if (is_touch) {
    if(evt.changedTouches && evt.changedTouches[0]){
      x = evt.changedTouches[0].clientX - offset.x;
      y = evt.changedTouches[0].clientY - offset.y;
    }
  } else {
    x = evt.clientX - offset.x;
    y = evt.clientY - offset.y;
  }
  return {
    x: x,
    y: y
  };
}
