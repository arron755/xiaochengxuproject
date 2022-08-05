<template>
	<view>
		<view class="search-box">
			<search @click="gotosearch"></search>
		</view>
		
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id" >
				<navigator style="width: 100%;height: 100%;" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类区域 -->
		<view class="navList">
			<view v-for="(item,index) in navList" :key="index" class="navitem" @click="navClickHandler(item)">
				<image :src="item.image_src" style="width: 128rpx;height: 140rpx;;"></image>
			</view>
		</view>
		
		
		
		<!-- 楼层区域 -->
		<view class="floorList" v-for="(item,index) in floorList" :key="index">
			<!-- 头部区域 -->	
			<view class="floortop"><image :src="item.floor_title.image_src" mode="widthFix"></image></view>
			
			<view style="display: flex;">
			<!-- 左边 -->
			<navigator :url="item.product_list[0].url">
			<image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
			</navigator>
			<!-- 右边 -->
			<view class="floorright">
			<navigator v-for="(item,index) in item.product_list" :url="item.url">
				<image :src="item.image_src" v-if="index!=0" :style="{width: item.image_width + 'rpx'}" mode="widthFix"></image>
			</navigator>
			</view>
			</view>
		</view>
		

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getswiperList()
			this.getnavList()
			this.getfloorList()
		},
		methods:{
			async getswiperList(){
				const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.swiperList = res.message
			},
			async getnavList(){
				const {data: res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			navClickHandler(item) {
			  // 判断点击的是哪个 nav
			  if (item.name === '分类') {
			    uni.switchTab({
			      url: '/pages/cate/cate'
			    })
			  }
			},
			async getfloorList(){
				const {data : res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				  // 通过双层 forEach 循环，处理 URL 地址
				  res.message.forEach(floor => {
				    floor.product_list.forEach(prod => {
				      prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				    })
				  })
				
				  this.floorList = res.message
				
			},
			gotosearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		image{
			height: 100%;
			width: 100%;
		}
	}
	
	.navList{
		display: flex;
		justify-content: space-around;
		margin-top: 10rpx;
	}
	
	.floorright{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.floorList{
		margin-top: 10rpx;
	}
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}

</style>
