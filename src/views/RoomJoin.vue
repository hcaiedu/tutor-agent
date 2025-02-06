<template>
  <div class="background">
    <div class="container">
      <div class="left">
        <!-- <div class="caption">
          Join Room
        </div> -->
        <div class="illustration">
          <img src="../assets/discussion2.png" alt="">
        </div>
      </div>
      <div class="right">
        <form action="" class="form">
          <div class="title">
            Join Room
          </div>
          <div class="input">
            <div class="inputName">ChatRoom Code</div>
            <input type="text" v-model="roomId" :disabled="roomIdEdit">
          </div>
          <div class="input">
            <div class="inputName">User Name</div>
            <input type="text" v-model="userName">
          </div>
          <div class="btn-container">
            <div class="btn" @click="goJoin">Join</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { join_room } from '@/api/roomApi';
  export default {
    data() {
      return {
        roomId: "",
        roomIdEdit: true,
        userName: ""
      };
    },
    methods: {
      goJoin() {
        const params = {
          roomId: this.roomId,
          userName: this.userName
        }
        join_room(params).then(res => {
          if(res.data.success=='success') {
            this.$router.push(
            {
              name: "chat",
              query: {
                roomId: this.roomId,
                userName: this.userName
              }
            }
           )
          }
        }).catch(err => {
          console.error("Error:", err);
        });
      }
    },
    created() {
      if (this.$route.query.roomId != '') {
        this.roomId = this.$route.query.roomId;
        this.roomIdEdit = false;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .background {
    width: 100%;
    height: 100vh;
    background: #E8F5E9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      display: flex;
      width: 80%;
      max-width: 1200px;
      background: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      .left {
        width: 50%;
        // padding: 5% 0;
        .illustration {
          width: 80%;
          // margin: 50px auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .caption {
          // width: 80%;
          color: #1B5E20;
          font-size: 32px;
          font-weight: 800;
          margin: 50px auto;
          text-align: center;
        }
      }
      .right {
        width: 50%;
        // padding-left: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .form {
          width: 80%;
          // display: flex;
          // // justify-content: center;
          // align-items: center;
          .title {
            color: #1B5E20;
            font-size: 26px;
            font-weight: 800;
            margin: 20px auto;
            text-align: center;
          }
          .input {
            margin: 20px auto;
            // display: flex;
            .inputName {
              margin-bottom: 5px;
              // background: #38783e;
              color: #1B5E20;
              // text-align: center;
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              padding: 5px 10px;
              font-weight: 600;
              // border-top-left-radius: 5px;
              // border-top-right-radius: 5px;
              width: 150px;
            }
            input {
              width: 90%;
              padding: 10px 5%;
              font-size: 16px;
              border-radius: 5px;
              border: #1B5E20 1px solid;
              &:focus {
                outline:none;
              }
            }
          }
          .btn-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;
            .btn {
              width: 100%;
              height: 50px;
              background: #1B5E20;
              color: #FFFFFF;
              text-align: center;
              line-height: 50px;
              font-size: 16px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
</style>
