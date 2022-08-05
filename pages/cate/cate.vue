<template>
	<view>
		<search @click="gotosearch"></search>
		<view style="display:flex;">
		<!-- 左侧 -->
		<scroll-view scroll-y="true" class="Bleftscroll" :style="{height: wh + 'px'}">
			<view v-for="(item,index) in catelist" :key="index" class="leftscroll" :class="index === aindex ? 'active' : ''" @click="checkActive(index)">
				<text>{{item.cat_name}}</text>
			</view>
		</scroll-view>
		
		<!-- 右侧 -->
		<scroll-view scroll-y="true" class="Brightscr" :style="{height: wh + 'px'}">
			<view v-for="(item,index) in catelist2" :key="index" class="Brightscritem" >
				<view style="text-align: center;font-size: 15px;font-weight: 200;text-align: center;margin: 20rpx 0rpx;">/{{item.cat_name}}/</view>
				<view style="display: flex;flex-wrap: wrap;">
				<view v-for="(item2,index1) in item.children" :key="index1" class="Brightscritem2" @click="gotogoodlist(item2)">
					<image :src="item2.cat_icon"></image>
					<text>{{item2.cat_name}}</text>
				</view>
				</view>
			</view>
		</scroll-view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				catelist:[],
				catelist2:[],
				aindex:0,
				wh:0
			};
		},
		methods:{
			async getcatelist(){
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.catelist = res.message;
				this.catelist2 = res.message[0].children
			},
			checkActive(index){
				this.aindex = index
				this.catelist2 = this.catelist[index].children
			},
			gotogoodlist(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			gotosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getcatelist()
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50  // 获取页面除去tarbar和顶部的区域剩下的值
		}
			
	}
</script>

<style lang="scss">
	.Bleftscroll{
		width: 200rpx;
		background-color: #efefef;
	}
	
	.leftscroll{
		padding: 25rpx 20rpx;
		text{
			font-size: 12px;
		}
		&.active{
			background-color: #ffffff;
			position: relative;
			
			&::before{
				content: '';
				display: block;
				position: absolute;
				width: 3px;
				height: 30px;
				background-color: red;
				left: 0;
				top:50%;
				transform: translateY(-50%);
			}
		}
	}
	.Brightscr{

	}
	.Brightscritem{
	}
	.Brightscritem2{
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		image{
			width: 60px;
			height: 60px;
		}
		
		text{
			font-size: 12px;
		}
	}
	

</style>
