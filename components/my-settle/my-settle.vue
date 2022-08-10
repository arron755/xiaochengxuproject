<template>
	<view>
		<view class="settlebox">
			<view class="radio">
				<radio :checked="isFullCheck" color="red" @click="change"></radio><text>全选</text>
			</view>
			<view class="sum">
				合计：￥{{sum}}
			</view>
			<view class="shop">
				结算<text>({{checkedCount}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapState,mapMutations} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed:{
			...mapGetters('cart',['total','sum','checkedCount']),
			isFullCheck() {
			  return this.total === this.checkedCount
			},
		},
		methods:{
			...mapMutations('cart',['updateAllGoodsState']),
			change(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	.settlebox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 50px;
		background-color: #efefef;
		z-index: 999;
		.radio{
			text{
				font-size: 12px;
			}
		}
		.shop{
			display: flex;
			height: 100%;
			background-color: red;
			color: #ffffff;
			width: 200rpx;
			justify-content: center;
			align-items: center;
		}
		.sum{
			font-size: 12px;
			
		}
	}
</style>
