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
    props: ['id', 'name', 'init_cost', 'performance', 'counter'],
    data: function() {
        return {
          qty: 0,
          cost: this.init_cost,
        }
    },
    created: function() {
        setInterval(this.produce, this.performance[1]);
    },
    watch: {
        qty: {
            handler: function(newVal, oldVal){
                if(oldVal == 4 && newVal == 5){
                    if(this.id != 15){
                        //次の施設をアンロック
                        this.$emit('unlock-next-building');
                    }
                }
            }
        }
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
        unlocked_items: [
            {id: 0, name: 'デバッグ', cost: 1, performance: [1,1000] },
            {id: 1, name: '見習い職人', cost: 15, performance: [1,10000] },
        ],
        locked_items: [
            {id: 2, name: 'かっぱ', cost: 100, performance: [1, 1000] },
            {id: 3, name: '農場', cost: 1100, performance: [8, 1000] },
            {id: 4, name: '鉱山', cost: 12000, performance: [47, 1000] },
            {id: 5, name: '工場', cost: 130000, performance: [260, 1000] },
            {id: 6, name: '銀行', cost: 1400000, performance: [1400, 1000] },
            {id: 7, name: '寺院', cost: 20000000, performance: [7800, 1000] },
            {id: 8, name: '魔法使いの塔', cost: 330000000, performance: [44000, 1000] },
            {id: 9, name: '宇宙船', cost: 5100000000, performance: [260000, 1000] },
            {id: 10, name: '錬金術', cost: 75000000000, performance: [1600000, 1000] },
            {id: 11, name: 'ポータル', cost: 1000000000000, performance: [10000000, 1000] },
            {id: 12, name: 'タイムマシン', cost: 14000000000000, performance: [65000000, 1000] },
            {id: 13, name: '反物質凝縮器', cost: 170000000000000, performance: [43000000, 1000] },
            {id: 14, name: 'プリズム', cost: 2100000000000000, performance: [2900000000, 1000] },
            {id: 15, name: 'チャンスメーカー', cost: 26000000000000000, performance: [21000000000, 1000] },
        ]
    },
    methods: {
        unLockNetxBuilding: function(id) {
            this.unlocked_items.push(this.locked_items.shift(0)); 盲目的に次の施設をアンロックすることにする
        },
        changeTotalQty: function(qty) {
            this.counter = this.counter + qty;
        }
    }
});


