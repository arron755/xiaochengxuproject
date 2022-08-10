<template>
	<view>
	
		<view class="goodlist">
			
			<radio :checked="item.goods_state" color="red" v-if="radchecked" style="margin-left: 3px;" @click="cradio"></radio>
			<view class="goodlistitem" >
				<view class="left" @click="gotoGooddetail(item)"><image :src="item.goods_small_logo || defaultPic"></image></view>
				<view class="right">
					<text>{{item.goods_name}}</text>
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view>￥{{item.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :value="item.goods_count" v-if="unibox" @change="goodscount"></uni-number-box>
					</view>
				</view>
			</view>
			
		</view>

		
	</view>
</template>

<script>
	// import {mapState,mapMutations} from 'vuex'
	export default {
		name:"goodList",
		data() {
			return {
				
			};
		},
		props:{
			item:{
				type:Object,
				default:{}
			},
			radchecked:{
				type:Boolean,
				default:false
			},
			unibox:{
				type:Boolean,
				default:false
			}
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods:{
			// ...mapMutations('cart',['updateGoodsState','updateGoodsCount','deleteGoods']),
			gotoGooddetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			cradio(){
				this.$emit('change-radio',{
					goods_id : this.item.goods_id,
					goods_state: !this.item.goods_state
				})
				// const e = {
				// 	goods_id:this.item.goods_id,
				// 	goods_state: !this.item.goods_state
				// 	}
				// this.updateGoodsState(e)
			},
			goodscount(val){
				this.$emit('clickgoodcount',{
					goods_id : this.item.goods_id,
					goods_count: +val
				})
			},
		},
	}

</script>

<style lang="scss">
	.goodlist{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #efefef;
		.goodlistitem{
			display: flex;
			padding: 5px 5px;
			flex-direction: row;
			justify-content: space-between;
			.left{
				image{
					width: 100px;
					height: 100px;
				}
			}
			.right{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 5px;
				text{
					font-size: 12px;
				}
				view{
					color: red;
				}
			}
		}
	}
</style>