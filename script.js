body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #b3e5fc; /* Calm ocean blue */
    color: #033e6b;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    text-align: center;
}

.title {
    font-size: 2em;
    margin-bottom: 20px;
}

.game-area {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.tile-bag {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    padding: 10px;
    background: #e1f5fe;
    border-radius: 10px;
    min-height: 200px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(8, 50px);
    grid-template-rows: repeat(5, 50px);
    gap: 5px;
    background: #e1f5fe;
    padding: 10px;
    border-radius: 10px;
}

.grid div {
    width: 50px;
    height: 50px;
    background: #ffffff;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.tile {
    width: 45px;
    height: 45px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    margin: 3px;
    cursor: grab;
}
