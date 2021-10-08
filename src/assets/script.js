// Insect el
let ins;

let totalBorders;

const btnStart = document.querySelector('.btn__start');
const game = document.querySelector('.game');
const controller = document.querySelector('.controller');

const borderData = [
  {
    id: 1,
    start: {
      col: 3 / 4,
      row: 3 / 4,
    },
    map: [
      // Vertical
      { isHorizontal: false, start: 4, end: 182 },
      { isHorizontal: false, start: 214, end: 424 },
      { isHorizontal: false, start: 70, end: 130 },
      { isHorizontal: false, start: 59, end: 509 },
      { isHorizontal: false, start: 30, end: 450 },
      { isHorizontal: false, start: 370, end: 400 },
      { isHorizontal: false, start: 375, end: 465 },
      { isHorizontal: false, start: 188, end: 278 },
      { isHorizontal: false, start: 191, end: 312 },
      { isHorizontal: false, start: 227, end: 317 },
      { isHorizontal: false, start: 92, end: 392 },

      // Horizontal
      { isHorizontal: true, start: 480, end: 505 },
      { isHorizontal: true, start: 5, end: 29 },
      { isHorizontal: true, start: 154, end: 158 },
      { isHorizontal: true, start: 160, end: 167 },
      { isHorizontal: true, start: 169, end: 177 },
      { isHorizontal: true, start: 336, end: 345 },
      { isHorizontal: true, start: 347, end: 358 },
      { isHorizontal: true, start: 105, end: 116 },
      { isHorizontal: true, start: 146, end: 146 },
      { isHorizontal: true, start: 75, end: 75 },
      { isHorizontal: true, start: 259, end: 267 },
      { isHorizontal: true, start: 297, end: 297 },
      { isHorizontal: true, start: 426, end: 429 },
      { isHorizontal: true, start: 408, end: 416 },
      { isHorizontal: true, start: 438, end: 438 },
      { isHorizontal: true, start: 153, end: 153 },
    ],
  },
];

const curPos = {
  row: {
    start: 1,
    end: 2,
  },
  col: {
    start: 3,
    end: 4,
  },
};

const fillBoxes = function () {
  let height = document.querySelector('.game').offsetHeight;
  for (let i = 0; height <= 240; i++) {
    height = document.querySelector('.game').offsetHeight;
    const box = document.createElement('div');
    box.classList.add('game__box');
    box.setAttribute('data-num', i);
    game.append(box);
  }
};

const calcBorder = function (data) {
  totalBorders = data.flatMap(el => {
    const curBorderCollections = [el.start];
    let temp = el.start;

    for (let i = 0; i < el.end; i++) {
      if (temp >= el.end) return curBorderCollections;

      if (!el.isHorizontal && temp < el.end) temp += 30;
      if (el.isHorizontal && temp < el.end) temp += 1;

      if (temp <= el.end) curBorderCollections.push(temp);
    }

    return curBorderCollections;
  });
};

const drawBorder = function (borderNums) {
  borderNums.forEach(el => {
    const box = document.querySelector(`div[data-num="${el}"`);
    box.classList.add('game__border');
    box.dataset.isBorder = true;
  });
};

const createInsect = function () {
  ins = document.createElement('div');
  ins.classList.add('game__box');
  ins.classList.add('game__insect');
  game.prepend(ins);
};

const updatePos = function (start, end, isRow) {
  if (isRow) {
    curPos.row.start += start;
    curPos.row.end += end;
    return;
  }

  curPos.col.start += start;
  curPos.col.end += end;
};

const moveInsect = function (dir) {
  if (dir === 'ArrowLeft') updatePos(-1, -1);
  if (dir === 'ArrowRight') updatePos(1, 1);

  if (dir === 'ArrowUp') updatePos(-1, -1, true);
  if (dir === 'ArrowDown') updatePos(1, 1, true);

  ins.style.gridRowStart = `${curPos.row.start}`;
  ins.style.gridRowEnd = `${curPos.row.end}`;

  ins.style.gridColumnStart = `${curPos.col.start}`;
  ins.style.gridColumnEnd = `${curPos.col.end}`;
};

const addMoveEvents = function () {
  controller.addEventListener('click', function (e) {
    moveInsect(e.target.dataset.key);
  });
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight'
    )
      moveInsect(e.key);
  });
};

btnStart.addEventListener('click', function () {
  console.log(ins.nextElementSibling);
  console.log(ins.previousElementSibling);
});

// Filling the game area with boxes (grid)
fillBoxes();

// Calculating the borders of provided data
calcBorder(borderData[0].map);

// Drawing the borders
drawBorder(totalBorders);

// Creating insect that will move
createInsect();

// Adding movement events listeners to the insect
addMoveEvents();
