<template>
  <div class="personal">
      <div class="personal-header">
          <h2>{{headerData}}</h2>
      </div>
       <div class="personal-content">
           <!--个人头像-->
           <div style="display: flex;flex-direction: column">
               <el-avatar :size="100" :src="avatarUrl"></el-avatar>
               <!--名称-->
               <div style="width: 170px;margin: 0 auto">
                   <h3>贾凯强/jsqiang/胖胖</h3>
                   <span>签名：你的努力终将不会被辜负</span>
               </div>
               <div style="margin: 16px auto">
                   <el-tag
                           v-for="item in tags"
                           :key="item.label"
                           :type="item.type"
                           effect="dark"
                           style="margin-left:16px"
                   >
                       {{ item.label }}
                   </el-tag>
               </div>
           </div>
           <!--个人简历-->
           <div class="person-social">
               <!--社交-->
               <div class="person-title">
                   社交
               </div>
              <div class="person-social-detial">
                  <div>
                      <span>github：</span>
                      <span>https://github.com/jiakaiqiang</span>
                  </div>
                  <div>
                      <span>csdn：</span>
                      <span>https://blog.csdn.net/weixin_44505867</span>
                  </div>
                  <div>
                      <span>qq：</span>
                      <span>1640598618</span>
                  </div>
              </div>
           </div>
           <div class="person-hobby">
              <div class="person-title">
                  兴趣爱好
              </div>
               <div>

                   <h3>编程</h3>
                   <p>
                      编程的从校园开始,接触的都是c,java,vb等，慢慢的就喜欢上了编程，喜欢通过一串串英文字母之间的拼接，可以实现出自己想要得东西，从最开始的输出hello word的惊喜到后来
                       一个个需求的实现，感受着编码带来的莫名的成就感，这成就感使得更加喜欢上了编程。好多人对于编程的行业的认识是秃头小宝贝，格子衬衫，油头长胡子，大裤衩，拖鞋，我来告诉大家
                       ，这个认知是错误的。我们是一群幽默，有趣，会用擅长的编程语言时不时进行battle的一群年轻人。
                   </p>
                   <h3>随手拍</h3>
                   <p>
                     随手拍不是摄影呦,其实也喜欢摄影,但是感觉用随手拍更加贴切点，喜欢用手里的手机，去记录生活中美好的画面，清晨的第一缕光，午间充满光的天空，飞机划破天际的美景，下班后的路灯等等。
                       什么光圈，曝光度，广角，等等都不存在的，这就是简单的随手拍

                   </p>
                   <h3>音乐绘画</h3>
                   <p>
                      音乐和绘画都很喜欢，但是都不咋地，天生的五音不全，天生的绘画技能不全，但是不影响喜欢，喜欢和会不冲突，喜欢隔壁老范沙哑的情歌，喜欢李宗盛有故事的歌等等。
                   </p>

               </div>
           </div>
           <div class="person-object">
               <div class="person-title">
                   个人项目
               </div>
               <div class="person-project-detail">
                 <div v-for="(item,index) in projects">
                     <div v-show="(index+1)%2===0">{{item.name}}</div>
                     <div>{{item.src}}</div>
                     <div  v-show="(index+1)%2!==0">{{item.name}}</div>
                 </div>
               </div>

           </div>
           <!--个人项目-->
   </div>
  </div>
</template>
<script>

    import {reactive,getCurrentInstance} from 'vue'

    export  default {
        setup(props,context){
            let headerData='生活不止眼前的苟且，还有诗和远方，在路上'
            let avatarUrl=require('../assets/img/avtar.jpg')
            let tags=[ { type: '', label: '摩羯座' },
                { type: 'success', label: '理工男' },
                { type: 'info', label: '95后' },
                { type: 'danger', label: '咸阳->沈阳->北京->西安' },
                { type: 'warning', label: '骑行' },{ type: 'warning', label: '风趣' }]
            let projects=[{name:"测试1",src:"2",time:"",reponse:"",status:""},{name:"测试2",src:"2",time:"",reponse:"",status:""},
                {name:"测试3",src:"2",time:"",reponse:"",status:""},{name:"测试3",src:"2",time:"",reponse:"",status:""}]

          return{
             headerData,
              avatarUrl,
              tags,
              projects
          }
        }

    }
</script>
<style lang="scss">
    @import "@/styles/variables.scss";
    .personal{
        width:100%;
        position: relative;
        .personal-header{
            height:400px;
            background-size: 100% 100%;
            background-image: url('../assets/img/personalBg1.jpg');

            h2 {

                position: absolute;
                width: 450px;
                left:50%;
                transform: translate(-50%,50px);
                color: transparent;
                background-color: #E8A95B;
                background-clip: text;
            }
            h2::after {
                content: attr(data-text);
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);

                background-size: 150% 100%;
                background-repeat: no-repeat;
                animation: shine 5s infinite linear;
            }
            @keyframes shine {
                0% {
                    background-position: 50% 0;
                }
                100% {
                    background-position: -190% 0;
                }
            }

        }
        .personal-content{
            p{
                line-height:1.5;
                text-indent:32px;
            }
            padding:0 32px 0 32px;
            position: absolute;
            border-radius: 20px;
            width: 80vw;
            left:50%;
            transform: translate(-50%,-236px);
            background-color:$mainColor;
            /*头像*/
            .el-avatar{
                width: 100%;
                margin:32px auto;
                animation:rotate  4s linear infinite  normal;
                /*img{*/
                /*    width: 50px;*/
                /*}*/
            }
            @keyframes avatorAmation {
                0% {
                    transform: rotate(0);
                }
                100% {
                   transform: rotate(360deg);
                }
            }
            /*社交*/
            .person-title{
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                font-size:16px;
                background-color: #8DFF9C;
            }
            .person-social{
                .person-social-detial{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    &>div:nth-of-type(1), &>div:nth-of-type(2),&>div:nth-of-type(3){
                       height:50px;
                        line-height:50px;
                        margin-left:16px;
                    }
                    &>div:nth-of-type(1){


                    }

                    &>div:nth-of-type(2){

                    }
                }


            }
            .person-project-detail{
                &>div{
                    display: flex;
                    &>div:nth-of-type(1){
                        width:300px;
                        background-color:pink;
                    }
                    &>div:nth-of-type(2){
                        flex:1;
                        background-color: hotpink;

                    }
                    &>div:nth-of-type(3){
                        width:300px;
                        background-color:green;

                    }
                }
            }
        }

    }

</style>
