const VALUES = [
    {id: "scissors", value: "✌🏽"},//0
    {id: "rock", value: "✊🏽"},//1
    {id: "paper", value: "🖐🏽"},//2
];
//tìm logic của game
//user dùng id làm valuePlayer: "scissors"|"rock"|"paper"
//computer dùng data-id làm valueComputer: "scissors"|"rock"|"paper"
//vd: valuePlayer: "rock"   |  valueComputer: "scissor"
//dùng để vào VALUES tìm index của phần tử có id == valuePlayer|valueComputer
//   => indexPlayer: 1     | indexComputer: 0
//trường hợp thắng
// 0 - 2 = -2
// 1 - 0 = 1              indexPlayer - indexComputer = 1 || -2 thắng return 1
// 2 - 1 = 1     
//trường hợp hòa          indexPlayer - indexComputer = 0       hòa   return 0
//còn lại                                                       thua  return -1

let i = 0;
const handleChange = () => {
    let computer = document.querySelector("#computer");
    computer.textContent = VALUES[i].value;
    computer.setAttribute("data-id", VALUES[i].id);
    i = i == VALUES.length - 1 ? 0 : ++i;
};
let interval = setInterval(handleChange, 100);

//làm hàm compare so sánh valuePlayer và valueComputer
//cho ra kết quả thắng 1 hòa 0 thua -1
const compare = (valuePlayer, valueComputer) => {
    let indexPlayer = VALUES.findIndex((item) => {
        return item.id == valuePlayer;
    });
    let indexComputer = VALUES.findIndex((item) => {
        return item.id == valueComputer;
    });
    let result = indexPlayer - indexComputer;
    if([1, -2].includes(result)){
        return 1;
    }else if(result == 0){
        return 0;
    }else{
        return -1;
    };
};

//
const playerItem = document.querySelectorAll(".user");
//duyet qua cac item(nut) cua player
playerItem.forEach((item) => {
    //nếu như có nút nào trong đó diễn ra sk click
    item.addEventListener("click", (event) => {
        //dừng máy lại, lấy data-id của máy làm valueComputer
        clearInterval(interval);
        let computer = document.querySelector("#computer");
        let valueComputer = computer.dataset.id;//getAttribute("data-id");
        let valuePlayer = event.target.id; //getAttribute
        let result = compare(valuePlayer, valueComputer);
        console.log(result);
        //duyệt các nút và xóa actived và thêm actived vào nút vừa bấm
        playerItem.forEach((_item) => {
            _item.classList.remove("actived");
            _item.style.pointerEvents = "none";
        });
        event.target.classList.add("actived");

        //hiển thị thông báo kết quả
        let alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        let msg = "";
        if(result == 1){
            msg = "Bạn Thắng";
            alertDiv.classList.add("alert-success");
        }else if(result == 0){
            msg = "Bạn Hòa";
            alertDiv.classList.add("alert-warning");
        }else{
            msg = "Bạn Thua";
            alertDiv.classList.add("alert-dark");
        };
        alertDiv.textContent = msg;
        document.querySelector(".notification").appendChild(alertDiv);
        document.querySelector(".play-again").classList.remove("d-none");
    });
});

//su kien nut choi lai
document.querySelector("#btn-play-again").addEventListener("click", (event) => {
    //cho may chay lai
    clearInterval(interval);
    interval = setInterval(handleChange, 100);
    //xoa actived tra lai kha nang click
    playerItem.forEach((_item) => {
        _item.classList.remove("actived");
        _item.style.pointerEvents = "";
    });
    //xoa thong bao
    document.querySelector(".notification").innerHTML = "";
    //an nut choi lai
    document.querySelector(".play-again").classList.add("d-none");

    //location.reload();
});
