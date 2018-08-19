Vue.component('item-component', {
    template: `<article class="message">
    <div class="message-header">
        {{ name }}
    </div>
    <div class="message-body">
        <span class="count">{{ qty }}</span> &nbsp; 必要コスト:
        <span>{{ cost }}</span>
        &nbsp;
        <button class="button" @click="addItem" v-bind:disabled="counter < cost">追加する</button>
        <p class="has-text-grey-light is-size-7">
            {{ this.performance[1] / 1000 }}秒に{{ this.performance[0] }}貫つくる能力があります。
        </p>
    </div>
</article>
    `,
    props: ['name', 'init_cost', 'performance', 'counter'],
    data: function() {
        return {
          qty: 0,
          cost: this.init_cost,
        }
    },
    created: function() {
        setInterval(this.produce, this.performance[1]);
    },
    methods: {
        addItem: function () {
            //コストを払う
            this.decSushi(this.cost);
            
            //コストをあげる
            this.cost = Math.floor(this.cost * 1.3);
            
            //カウントを増やす
            this.qty++;
        },
        produce: function() {
            this.incSushi(this.qty * this.performance[0]);
        },
        incSushi: function(sushi_qty){
            this.$emit('change-total-qty', sushi_qty);
        },
        decSushi: function(sushi_qty){
            this.incSushi(-1 * sushi_qty);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        counter: 0,
        man: 0,
        man_cost: 10,
        robot: 0,
        robot_cost: 30,
        item_list: [
            {id: 1, name: 'Machine(しゃり握り機)', cost: 3, performance: [1,10000] },
            {id: 2, name: 'Kappa(かっぱ)', cost: 100, performance: [1, 1000] }
        ]
    },
    created: function () {
        setInterval(this.enterFrame, 1050);
    },
    methods: {
        changeTotalQty: function(qty) {
            this.counter = this.counter + qty;
        },
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


