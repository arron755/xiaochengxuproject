<template>
	<view>

		<block v-for="(item,index) in goodlist">
			<goodList :item="item"></goodList>
		</block>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodlist: [],
				total: 0,
				isloading: false,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getgoodlist()
		},
		methods: {
			async getgoodlist(cb) {
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (res.meta.status !== 200) return uni.$http.$showMsg
				cb && cb()
				this.isloading = false
				this.goodlist = [...this.goodlist, ...res.message.goods]
				this.total = res.message.total
			},
		},

		onReachBottom() {
			if (this.isloading) return
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return
			this.queryObj.pagenum++
			this.getgoodlist()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodlist = []
			this.getgoodlist(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="scss">

</style>
