import React, { useEffect, useState } from 'react';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const  App = () => {
  const [snakeDots, setSnakeDots] = useState([[0, 0], [2, 0]]);
  const [snakeSpeed, setSnakeSpeed] = useState(200);
  const [snakeFood, setSnakeFood] = useState(getRandomCoordinates());
  const [snakeDirection, setSnakeDirection] = useState('RIGHT');

  useEffect(() => {
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
    document.onkeydown = onKeyDown;
    const interval = setInterval(() => {
      moveSnake()
    }, 200);
    return () => clearInterval(interval);
  });


  const onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode) {
      case 38:
        setSnakeDirection('UP');
        break;
      case 40:
        setSnakeDirection('DOWN');
        break;
      case 37:
        setSnakeDirection('LEFT');
        break;
      case 39:
        setSnakeDirection('RIGHT');
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch(snakeDirection) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }

    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if(head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    })
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    let food = snakeFood;
    if(head[0] === food[0] && head[1] === food[1]) {
      setSnakeFood(getRandomCoordinates());
      enlargeSnake();
      increaseSpeed();
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const increaseSpeed = () => {
    if(snakeSpeed > 10) {
      setSnakeSpeed(snakeSpeed - 10);
    }
  };

  const onGameOver = () => {
    alert(`Game Over. Snake length is ${snakeDots.length}`);
    setSnakeDots(([[0, 0], [2, 0]]));
    setSnakeDirection('RIGHT');
    setSnakeFood(getRandomCoordinates());
    setSnakeSpeed(200);
  }

  return (
   <div className="game-area">
     <Snake snakeDots={snakeDots} />
     <Food dot={snakeFood} />
   </div>
  );
};

export default App;
