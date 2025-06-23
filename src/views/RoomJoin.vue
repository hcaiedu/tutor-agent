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
          <div class="userInfo">
            Welcome! <div class="userName">{{ this.userName }}</div>
          </div>
          <div class="input">
            <div class="inputName">Your discussion room list:</div>
            <select v-model="selectedRoomId">
              <option disabled value="">Please select a room to join</option>
              <option v-for="room in roomList" :key="room.roomId" :value="room.roomId">
                {{ room.roomName }}
              </option>
            </select>
          </div>
          <div class="separator">
            ----or----
          </div>
          <div class="input">
            <div class="inputName">Input a room id</div>
            <input type="text" v-model="selectedRoomId">
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
import { get_user_info } from '@/api/userApi';
export default {
  data() {
    return {
      roomList: [],
      userName: "",
      userId: "",
      userAvatar: "",
      selectedRoomId: ""
    };
  },
  methods: {
    goJoin() {
      const params = {
        roomId: this.selectedRoomId,
        userId: this.userId,
        userName: this.userName,
        userAvatar: this.userAvatar
      }
      join_room(params).then(res => {
        if (res.data.status == 'success') {
          this.$router.push(
            {
              name: "chat",
              query: {
                roomId: this.selectedRoomId,
                userId: this.userId,
                userName: this.userName,
                userAvatar: this.userAvatar
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
    this.userId = this.$route.query.userId;
    get_user_info(this.$route.query.userId).then(res => {
      // this.userInfo = res.data;
      this.userName = res.data.userName;
      this.userAvatar = res.data.userAvatar;
      this.roomList = res.data.roomList;
    }).catch(err => {
      console.error("Error:", err);
    });
    // if (this.$route.query.roomId != '') {
    //   this.roomId = this.$route.query.roomId;
    //   this.roomIdEdit = false;
    // }
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
      display: flex;
      justify-content: center;

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

        .userInfo {
          font-size: 18px;
          display: flex;
          .userName {
            color: #1B5E20;
            margin-left: 10px;
            font-weight: 600;
          }
        }

        .input {
          margin: 5px auto;

          // display: flex;
          .inputName {
            margin-bottom: 5px;
            // background: #38783e;
            color: #1B5E20;
            // text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            padding: 5px 1px;
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
              outline: none;
            }
          }

          select {
            width: 100%;
            padding: 10px 5%;
            font-size: 16px;
            border-radius: 5px;
            border: #1B5E20 1px solid;

            &:focus {
              outline: none;
            }
          }
        }
        .separator {
          text-align: center;
          font-size:16px;
        }
        .btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;

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
