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
  const maker = document.getElementById("maker");
  const table = document.getElementById("table");
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  
  const tb = table.getBoundingClientRect();
  console.log(tb);
  const tW = tb.width/2;
  const tH = tb.height/2;

  const cells = Array.from(table.querySelectorAll("td"));
  function handleDrag(e, elem) {
    var x = e.clientX - tb.left;
    var y = e.clientY - tb.top;
    if (x < 0 || x > tb.width || y < 0 || y > tb.height) return;
    if (container.contains(elem)) container.removeChild(elem);
    else return;
    if (x < tW && y < tH) {
      cells[0].innerHTML = elem.innerText;
      console.log("top left");
    } else if (x > tW && y < tH) {
      cells[1].innerHTML = elem.innerText;
      console.log("top right");
    } else if (x <= tW && y >= tH) {
      cells[2].innerHTML = elem.innerText;
      console.log("bottom left");
    } else if (x >= tW && y >= tH) {
      cells[3].innerHTML = elem.innerText;
      console.log("bottom right");
    }
  }

  function display(ch) {
    // if (Math.random() > 0.5) return; // only show some
    const span = document.createElement("button");
    span.classList = "bit";
    span.innerText = ch;
    span.style.left = `${getRandomInt(wOffset,w)}px`;
    span.style.top = `${getRandomInt(hHalf+(h/6),h)}px`;
    addDrag(span);
    container.appendChild(span);
  }

  fetch("https://annaylin.com/100-days/sunmoonsky/radicals.json").then((r) => r.json()).then((d) => {
    Array.from(d).forEach((radical) => display(radical));
    alphabet.forEach((letter) => display(letter));
  });

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
});