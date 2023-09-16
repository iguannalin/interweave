window.addEventListener("load", () => {
  const wOffset = (window.innerWidth/10);
  const w = window.innerWidth - wOffset;
  const hOffset = (window.innerHeight/15);
  const h = window.innerHeight - hOffset;
  const wHalf = (w/2);
  const hHalf = (h/2);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const container = document.getElementById("container");
  const table = document.getElementById("table");
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  
  const tb = table.getBoundingClientRect();
  const tW = tb.width/2;
  const tH = tb.height/2;

  function display(ch) {
    const span = document.createElement("button");
    span.classList = "bit";
    span.innerText = ch;
    span.style.left = `${getRandomInt(wOffset,w)}px`;
    span.style.top = `${getRandomInt(hHalf+(h/10),h)}px`;
    addDrag(span);
    container.appendChild(span);
  }

  const cells = Array.from(table.querySelectorAll("td"));
  function handleDrag(e, elem) {
    var x = e.clientX - tb.left;
    var y = e.clientY - tb.top;
    if (x < 0 || x > tb.width || y < 0 || y > tb.height) return;
    if (container.contains(elem)) container.removeChild(elem);
    else return;
    let cell;
    if (x < tW && y < tH) {
      cell = cells[0];
    } else if (x > tW && y < tH) {
      cell = cells[1];
    } else if (x <= tW && y >= tH) {
      cell = cells[2];
    } else if (x >= tW && y >= tH) {
      cell = cells[3];
    }
    if (!cell) return;
    cell.innerHTML = elem.innerText;
    cell.style.transform = `scale(${getRandomInt(5,15)/10},${getRandomInt(10,13)/10})`;
  }

  // code from https://codepen.io/deepakkadarivel/pen/LrGEdL
  function addDrag(box) {
    function onMove(e, isMobile = false) {
        e.preventDefault();
        handleDrag(e, box);
        if (isMobile) {
          var touchLocation = e.targetTouches[0];
          box.style.left = touchLocation.pageX - 10 + 'px';
          box.style.top = touchLocation.pageY - 10 + 'px';
        } else {
          box.style.left = e.pageX - 10 + 'px';
          box.style.top = e.pageY - 10 + 'px';
        }
    }
    box.addEventListener('mousedown', function() {
      document.addEventListener('mousemove', onMove);
    })
    document.addEventListener('mouseup', function(e) {
      document.removeEventListener('mousemove', onMove);
    });
    box.addEventListener('touchmove', () => onMove(e, true));
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((d) => {
    Array.from(d).forEach((radical) => display(radical));
    alphabet.forEach((letter) => display(letter));
  });
});