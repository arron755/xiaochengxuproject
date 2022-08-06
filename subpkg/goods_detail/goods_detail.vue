<template>
	<view v-if="goodsdatail.goods_name" style="padding-bottom: 50px;">
		<swiper :indicator-dots="true" autoplay="true" interval="3000" :circular="true">
			<swiper-item v-for="(item,index) in goodsdatail.pics">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		
		<view class="goodsdetail">
			<view class="goodsprice">￥{{goodsdatail.goods_price}}</view>
			<view class="goodsname">
				<view class="left">{{goodsdatail.goods_name}}</view>
				<view class="right">
					<uni-icons type="star"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goodsd">快递:免运费</view>
		</view>

			<rich-text :nodes="goodsdatail.goods_introduce"></rich-text>
			<view class="unigoodsnav">
				<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"  />
			</view>
			

		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsdatail: {},
				goodsid: '',
				options: [ {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			this.goodsid = options.goods_id
			this.getgoodsdetail()
		},
		methods: {
			async getgoodsdetail() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: this.goodsid
				})
				if (res.meta.status !== 200) return uni.$http.$showMsg
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goodsdatail = res.message
			},
			onClick(e) {
				console.log(e);
				if(e.content.text == '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		swiper-item {
			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.goodsdetail {
		padding: 10px;
		padding-right: 0;
		.goodsprice {
			color: red;
		}

		.goodsname {
			display: flex;
			margin-top: 7px;

			.left {
				font-size: 13px;
			}

			.right {
				display: flex;
				flex-direction: column;
				width: 100px;
				align-items: center;
				border: 1px solid #efefef;
				padding: 5px;

				text {
					font-size: 13px;
				}
			}
		}

		.goodsd {
			margin-top: 7px;
			font-size: 10px;
			color: gray;
		}
	}
	.unigoodsnav{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
