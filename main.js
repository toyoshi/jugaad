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
        <div>{{ icons }}</div>
    </div>
</article>
    `,
    props: ['id', 'name', 'init_cost', 'performance', 'icon', 'counter'],
    data: function () {
        return {
            qty: 0,
            icons: '',
            cost: this.init_cost,
        }
    },
    created: function () {
        setInterval(this.produce, this.performance[1]);
    },
    watch: {
        qty: {
            handler: function (newVal, oldVal) {
                //5つ作ったら次の施設をアンロック
                if (oldVal == 4 && newVal == 5) {
                    this.$emit('unlock-next-building');
                }
            }
        }
    },
    methods: {
        addItem: function () {
            //コストを払う
            this.decSushi(this.cost);
            //コストをあげる
            this.cost = Math.floor(this.cost * 1.2);
            //カウントを増やす
            this.qty++;

            this.icons = this.icon.repeat(this.qty);
        },
        produce: function () {
            this.incSushi(this.qty * this.performance[0]);
        },
        incSushi: function (sushi_qty) {
            this.$emit('change-total-qty', sushi_qty);
        },
        decSushi: function (sushi_qty) {
            this.incSushi(-1 * sushi_qty);
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        counter: 0,
        unlocked_items: [
            //{id: 0, name: 'デバッグ', icon: '⚙', cost: 1, performance: [1,1000] },
            { id: 1, name: '見習い職人', icon: '👶', cost: 15, performance: [1, 10000] },
        ],
        locked_items: [
            { id: 2, name: 'かっぱ', icon: '🐸', cost: 100, performance: [1, 1000] },
            { id: 3, name: '農場', icon: '🍌', cost: 1100, performance: [8, 1000] },
            { id: 4, name: '鉱山', icon: '⛰', cost: 12000, performance: [47, 1000] },
            { id: 5, name: '工場', icon: '🏭', cost: 130000, performance: [260, 1000] },
            { id: 6, name: '銀行', icon: '🏦', cost: 1400000, performance: [1400, 1000] },
            { id: 7, name: '寺院', icon: '🕍', cost: 20000000, performance: [7800, 1000] },
            { id: 8, name: '将太', icon: '👴', cost: 330000000, performance: [44000, 1000] },
            { id: 9, name: '宇宙船', icon: '🚀', cost: 5100000000, performance: [260000, 1000] },
            { id: 10, name: '錬金術', icon: '🥇', cost: 75000000000, performance: [1600000, 1000] },
            { id: 11, name: 'ポータル', icon: '🏗', cost: 1000000000000, performance: [10000000, 1000] },
            { id: 12, name: 'タイムマシン', icon: '⏱', cost: 14000000000000, performance: [65000000, 1000] },
            { id: 13, name: '反物質凝縮器', icon: '🌀', cost: 170000000000000, performance: [43000000, 1000] },
            { id: 14, name: '大人のかっぱ', icon: '🧝', cost: 2100000000000000, performance: [2900000000, 1000] },
            { id: 15, name: 'チャンスメーカー', icon: '🌬', cost: 26000000000000000, performance: [21000000000, 1000] },
        ]
    },
    methods: {
        unLockNetxBuilding: function (id) {
            if (this.locked_items.length > 0) {
                this.unlocked_items.push(this.locked_items.shift(0)); //無条件でリストの次の施設をアンロックすることにする
            }
        },
        changeTotalQty: function (qty) {
            this.counter = this.counter + qty;
        },
        createSnsUrl: function () {
            var url = encodeURIComponent(location.href);
            var txt = encodeURIComponent(this.counter + '貫の寿司を握りました。🍣クリッカー @toyoshi');
            return 'https://twitter.com/intent/tweet?text=' + txt + '&url=' + url;
        }
    }
});


