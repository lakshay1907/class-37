class Player{
    constructor(){
     
    }
    getCount(){
        var listener = database.ref("playerCount");
        listener.on("value",function(data){
            playerCount = data.val();
        })
        }
        updateCount(count){
            database.ref("/").update({
                playerCount:count,
            })
        }
        update(name){
            var playerIndex = "player"+playerCount;
            database.ref(playerIndex).set({
                name: name
            })
        }
} 