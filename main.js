var app = new Vue({
    el: '#app',
    data: {
        counter: 0,
        man: 0,
        man_cost: 10,
        robot: 0,
        robot_cost: 30,
    },
    created: function () {
        setInterval(this.enterFrame, 1050);
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
        addRobot: function () {
            //コストを払う
            this.counter -= this.robot_cost;
            //コストをあげる
            this.robot_cost = Math.floor(this.robot_cost * 1.3);

            //カウントを増やす
            this.robot++;
        },
        manWork: function () {
            this.counter += this.man;
        },
        robotWork: function () {
            this.counter += this.robot * 3;
        },
        enterFrame: function () {
            app.manWork();
            app.robotWork();
        }
    }
});


