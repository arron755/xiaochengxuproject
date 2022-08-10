<template>
	<view v-if="goodsdatail.goods_name" style="padding-bottom: 50px;">
		<swiper :indicator-dots="true" autoplay="true" interval="3000" :circular="true">
			<swiper-item v-for="(item,index) in goodsdatail.pics">
				<image :src="item.pics_big" @click="preview(i)"></image>
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
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>




	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				goodsdatail: {},
				goodsid: '',
				options: [{
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
				if (e.content.text == '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			preview(i) {
				// 调用 uni.previewImage() 方法预览图片
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: i,
					// 所有图片 url 地址的数组
					urls: this.goodsdatail.pics.map(x => x.pics_big)
				})
			},
			...mapMutations('cart', ['addcart']),
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsdatail.goods_id,
						goods_name: this.goodsdatail.goods_name, // 商品的名称
						goods_price: this.goodsdatail.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsdatail.goods_small_logo, // 商品的图片
						goods_state: true
					}
					this.addcart(goods)
				}
			},
		},
		watch: {
			total: {
				handler(newvalue) {
					// 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
					const findResult = this.options.find((x) => x.text === '购物车')
					if (findResult) {
						// 3. 动态为购物车按钮的 info 属性赋值
						findResult.info = newvalue
					}
				},
				immediate: true
			}

		},
		computed: {
			...mapGetters('cart', ['total'])
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

	.unigoodsnav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
