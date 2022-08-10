<template>
	<view>
		
		<view style="padding-bottom: 50px;" v-if="cart.length !== 0">
		<my-address></my-address>
		
		<view class="top" style="border-bottom: 1px solid #efefef;padding: 10px;">
			<uni-icons type="shop" size="15"></uni-icons>
			<text style="font-size: 13px;margin-left: 5px;">购物车</text>
		</view>
		
		
		<uni-swipe-action ref="swipeAction">
		<block v-for="(item,index) in cart" :key="index">
			<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)" :auto-close="true">
			<goodList :item="item" :radchecked="true" @change-radio="cradio" :unibox="true" @clickgoodcount="clickgoodcount"></goodList>
			</uni-swipe-action-item>
		</block>
		</uni-swipe-action>
		
		
		<my-settle></my-settle>
		</view>
		  <view class="empty-cart" v-else>
		    <image src="../../static/cart_empty@2x.png" class="empty-img"></image>
		    <text class="tip-text">空空如也~</text>
		  </view>
	</view>
</template>

<script>
	import badgeMix from '../../mixin/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
			    options: [{
			      text: '删除', // 显示的文本内容
			      style: {
			        backgroundColor: '#C00000' // 按钮的背景颜色
			      }
			    }],
				address:{}
			};
		},
		mixins: [badgeMix],
		computed:{
			...mapState('cart',['cart'])
		},
		methods:{
			...mapMutations('cart',['updateGoodsState','updateGoodsCount','deleteGoods']),
			cradio(e){
				console.log(e);
				this.updateGoodsState(e)
			},
			clickgoodcount(e){
				this.updateGoodsCount(e)
				uni.setTabBarBadge({
				  index: 2,
				  text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
				})
			},
			swipeActionClickHandler(goods){
				this.deleteGoods(goods)
			},
		}
	}
</script>

<style lang="scss">
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
