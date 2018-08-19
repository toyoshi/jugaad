var app = new Vue({
    el: '#app',
    data: {
        counter: 0,
        man: 0,
        man_cost: 10,
        isManCostEnough: false,
    },
    methods: {
        addMan: function () {
            //コストを払う
            this.counter -= this.man_cost;
            //コストをあげる
            this.man_cost = Math.floor(this.man_cost * 1.3);

            //カウントを増やす
            this.man++;
        },
        manWork: function () {
            this.counter += this.man;
        }
    }

});


setInterval(enter_frame, 1050);

function enter_frame() {
    app.manWork();
}