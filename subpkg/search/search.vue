<template>
	<view>
		<view class="search-box">
		  <!-- 使用 uni-ui 提供的搜索组件 -->
		  <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<view class="searchlist">
			<view class="searchitem" v-for="(item,index) in searchlist" :key="index">
				<view class="goods-name" @click="gotoDetail(item.goods_id)">{{item.goods_name}}</view> 
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		
		<view v-if="searchold.length !== 0">
		<view class="searchold" >
			<text>搜索历史</text>
			<uni-icons type="trash-filled" size="20" @click="delsearchold"></uni-icons>
		</view>
		
		<view class="searcholdtag">
			<uni-tag :text="item" v-for="(item, i) in historylist" :key="i" inverted='true' @click="gotoGoodsList(item)"></uni-tag>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchlist:[],
				searchold:[]
			};
		},
		methods: {
		  input(e) {
			clearTimeout(this.timer)
		    // e 是最新的搜索内容
			this.timer = setTimeout(()=>{
				this.kw = e
				this.saveSearchHistory()
				this.getsearchlist()
			},500)
		  },
		  async getsearchlist(){
			  if(this.kw === ''){
				  this.searchlist = []
				  return
			  }
			  const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
			  if(res.meta.status !== 200) return uni.$showMsg()
			  this.searchlist = res.message
		  },
		  gotoDetail(goods_id){
			  uni.navigateTo({
			  	url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			  })
		  },
		  saveSearchHistory(){
			  const set = new Set(this.searchold)
			  set.delete(this.kw)
			  set.add(this.kw)
			  this.searchold = Array.from(set)
			  uni.setStorageSync('kw', JSON.stringify(this.searchold))
		  },
		  delsearchold(){
			  this.searchold = []
			  uni.setStorageSync('kw', '[]')
		  },
		  gotoGoodsList(kw) {
		    uni.navigateTo({
		      url: '/subpkg/goods_list/goods_list?query=' + kw
		    })
		  }
		},
		computed:{
			historylist(){
				return [...this.searchold].reverse()
			}
		},
		onLoad() {
			this.searchold = JSON.parse(uni.getStorageSync('kw') || '[]')
		}
	}
</script>

<style lang="scss">
	.search-box {
	  position: sticky;
	  top: 0;
	  z-index: 999;
	}
	.searchlist{
		.searchitem{
			height: 30px;
			padding:20rpx 10rpx;
			border: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content:space-between;
			text{
				font-size: 12px;
			}
			.goods-name{
				      // 文字不允许换行（单行文本）
			white-space: nowrap;
				      // 溢出部分隐藏
			overflow: hidden;
				      // 文本溢出后，使用 ... 代替
			text-overflow: ellipsis;
			font-size: 12px;
			}
		}
	}
	.searchold{
		margin-top: 5px;
		padding:5px 2px;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		text{
			font-size: 13px;
			font-weight: 300;
		}
	}
	.searcholdtag{
		margin: 5px 0px 0 5px;
		display: flex;
	}
</style>
