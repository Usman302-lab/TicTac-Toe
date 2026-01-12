document.addEventListener("DOMContentLoaded", () => {
    let outer=document.getElementById("outer");
    let results=document.getElementById("results");
    let arr=new Array(9).fill(undefined);
    let chance=false;
    outer.addEventListener("click",(e)=>{
        let cell=e.target;
        let cellNumber=cell.getAttribute("data-cell");
        if(cell.getAttribute("data-clicked")) {
            return;
        }
        cell.setAttribute("data-clicked", "true");
        if(chance===true){
            cell.innerText="O";
            cell.classList.add("o-player");
            arr[cellNumber]="O";
            checkWinner("O");
        }
        else{
            cell.innerText="X";
            cell.classList.add("x-player");
            arr[cellNumber]="X";
            checkWinner("X");
        }
        chance=!chance;
    })

    function checkWinner(char){
        let winningCombinations=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let combination of winningCombinations){
            let [a,b,c]=combination;
            if(arr[a]===char && arr[b]===char && arr[c]===char){
                results.textContent = `${char} wins!`;
                setTimeout(resetGame, 2000);
                return;
            }
        }
        if(arr.every(cell => cell !== undefined)){
            results.textContent = "It's a draw!";
            setTimeout(resetGame, 2000);
        }
    }

    function resetGame(){
        arr.fill(undefined);
        let cells=document.querySelectorAll("[data-cell]");
        cells.forEach(cell => {
            cell.innerText="";
            cell.removeAttribute("data-clicked");
            cell.classList.remove("x-player", "o-player");
        });
        results.textContent = "";
        chance=false;
    }

});