<template>
	
	<view>
		<view class="searchbox" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
			<view class="searchitem" :style="{'border-radius':radius+'px'}">
				<uni-icons type="search" size="20"></uni-icons>
				<text>搜索</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"search",
		data() {
			return {

			};
		},
		// 设置props方便组件的使用者能够自行设置
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		methods:{
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.searchbox{
		height: 50px;
		display: flex;
		align-items: center;
		padding:0 20px;
		.searchitem{
			height: 36px;
			width: 100%;
			display: flex;
			background-color: #ffffff;
			justify-content: center;
			align-items: center;
			 text{
				 font-size: 13px;
				 margin-left: 2px;
			 }
		}
	}

</style>