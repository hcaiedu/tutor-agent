<template>
  <div class="background">
    <div class="container">
      <div class="left">
        <div class="illustration">
          <img src="../assets/discussion.png" alt="">
        </div>
        <div class="caption">
          Collaborative Learning Teacher Client
        </div>
      </div>
      <div class="right">
        <form action="" class="form">
          <div class="title">
            Create Room
          </div>
          <div class="input">
            <div class="inputName">ChatRoom Name</div>
            <input type="text" v-model="roomInfo.roomName">
          </div>
          <div class="input">
            <div class="inputName">Custom Name</div>
            <input type="text" v-model="roomInfo.roomCustomName">
          </div>
          <div class="short-input-container">
            <div class="shortInput">
              <div class="inputName">Participants Number</div>
              <input type="number" v-model="roomInfo.memberNum">
            </div>
            <div class="shortInput">
              <div class="inputName">Chat Timer</div>
              <input type="number" v-model="roomInfo.chatTime">
            </div>
          </div>
          <div class="radio">
            <div class="inputName">Assertiveness</div>
            <div class="radio-container">
              <label class="radio-option"><input type="radio" value="Low" v-model="roomInfo.assertiveness">Low</label>
              <label class="radio-option"><input type="radio" value="Midium" v-model="roomInfo.assertiveness">Midium</label>
              <label class="radio-option"><input type="radio" value="High" v-model="roomInfo.assertiveness">High</label>
            </div>
          </div>
          <div class="textarea">
            <div class="inputName">Discussion Topic</div>
            <textarea type="text" v-model="roomInfo.topic"/>
          </div>
          <div class="btn-container">
            <div class="btn" @click="goCreate">Create</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { create_room } from '@/api/roomApi';
  export default {
    data() {
      return {
        roomInfo: {
          roomName: '',
          roomCustomName: '',
          memberNum: '',
          chatTime: '',
          assertiveness: '',
          topic: ''
        }
      }
    },
    methods: {
      goCreate() {
        create_room(this.$data.roomInfo).then(res => {
          if(res.data.roomId) {
            this.$router.push(
            {
              name: "roomjoin",
              query: {
                roomId: res.data.roomId
              }
            }
          )
          }
        }).catch(err => {
          console.error("Error:", err);
        });
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
        padding: 5% 0;
        .illustration {
          width: 80%;
          margin: 50px auto;
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
          .short-input-container {
            display: flex;
            justify-content: space-between;
            .shortInput {
              width: 45%;
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
                // width: 150px;
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
          }
          
          .textarea {
            margin: 20px auto;
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
              // width: 150px;
            }
            textarea {
              width: 90%;
              height: 100px;
              padding: 10px 5%;
              font-size: 16px;
              border-radius: 5px;
              border: #1B5E20 1px solid;
              &:focus {
                outline:none;
              }
            }
          }
          .radio {
            margin: 20px auto;
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
              // width: 150px;
            }

            .radio-container {
              display: flex;
              justify-content: space-between;
              .radio-option {
                margin: 0 30px;
                input {
                  width: 30px;
                  padding: 10px;
                  font-size: 16px;
                  border-radius: 5px;
                  border: #1B5E20 1px solid;
                  &:focus {
                    outline:none;
                  }
                }
              }
              
            }
            
          }
          .btn-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
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
