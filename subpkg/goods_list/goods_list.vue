<template>
	<view>
		<view class="goodlist">
			<block v-for="(item,index) in goodlist" :key="index">
			<view class="goodlistitem" @click="gotoGooddetail(item)">
				<view class="left"><image :src="item.goods_big_logo || defaultPic"></image></view>
				<view class="right">
					<text>{{item.goods_name}}</text>
					<view>￥{{item.goods_price | tofixed}}</view>
				</view>
			</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodlist:[],
				total: 0,
				isloading:false,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getgoodlist()
		},
		methods:{
			async getgoodlist(cb){
				this.isloading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(res.meta.status !==200) return uni.$http.$showMsg
				cb && cb()
				this.isloading = false
				this.goodlist = [...this.goodlist,...res.message.goods]
				this.total = res.message.total
			},
			gotoGooddetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		filters: {
		  // 把数字处理为带两位小数点的数字
		  tofixed(num) {
		    return Number(num).toFixed(2)
		  }
		},
		onReachBottom() {
			if(this.isloading) return
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return
			this.queryObj.pagenum ++
			this.getgoodlist()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodlist = []
			this.getgoodlist(()=>{uni.stopPullDownRefresh()}) 
		}
	}
</script>

<style lang="scss">
	.goodlist{
		.goodlistitem{
			display: flex;
			padding: 5px 5px;
			border: 1px solid #efefef;
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
