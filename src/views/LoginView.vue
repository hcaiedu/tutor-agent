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
        <form action="" class="form" v-if="loginFlag">
          <div class="title">
            Login
          </div>
          <div class="input">
            <div class="inputName">Name</div>
            <input type="text" v-model="loginInfo.userName" placeholder="please input your name">
          </div>
          <div class="input">
            <div class="inputName">Password</div>
            <!-- <input v-model="userPswd" :type='pwdFlag ? "password" : "text"'> -->
            <div class="psdContainer">
              <input :type="showPassword ? 'text' : 'password'" v-model="loginInfo.userPswd"
                placeholder="please input the password" />
              <i class="toggle-icon" :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="showPassword = !showPassword"></i>
            </div>
          </div>
          <div class="btn-container" style="margin-top: 40px;">
            <div class="btn" @click="goLogin">Login</div>
          </div>
          <div class="textBtn-container">
            <div>Don't have an account? <span class="textBtn" @click="loginFlag = !loginFlag">Register</span></div>
          </div>
        </form>
        <form action="" class="form" v-if="!loginFlag">
          <div class="title">
            Register
          </div>
          <div class="input">
            <div class="inputName">Name</div>
            <input type="text" v-model="registerInfo.userName" placeholder="please input your name">
          </div>
          <div class="input">
            <div class="inputName">Password</div>
            <!-- <input v-model="userPswd" :type='pwdFlag ? "password" : "text"'> -->
            <!-- <img :src='pwdFlag ? pwdIcon : textIcon' @click="showPwd"> -->
            <div class="psdContainer">
              <input :type="showPassword ? 'text' : 'password'" v-model="registerInfo.userPswd"
                placeholder="please input the password" />
              <i class="toggle-icon" :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                @click="showPassword = !showPassword"></i>
            </div>
          </div>
          <div class="radio">
            <div class="inputName">Assertiveness</div>
            <div class="radio-container">
              <label v-for="option in roleOptions" :key="option.value" class="radio-option"
                :class="{ 'selected': registerInfo.mode === option.value }">
                <input type="radio" :value="option.value" v-model="registerInfo.mode">
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>
          <div class="btn-container">
            <div class="btn" @click="goRegister">register</div>
          </div>
          <div class="textBtn-container">
            <div>Already have account? <span class="textBtn" @click="loginFlag = !loginFlag">Login</span></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { login, register } from '@/api/userApi';
export default {
  data() {
    return {
      loginFlag: true,
      showPassword: false,
      loginInfo: {
        userName: "",
        userPswd: ""
      },
      registerInfo: {
        userName: "",
        userPswd: "",
        mode: "student"
      },
      roleOptions: [
        { value: 'student', label: 'Student' },
        { value: 'teacher', label: 'Teacher' }
      ]
    };
  },
  methods: {
    goLogin() {
      login(this.$data.loginInfo).then(res => {
        if (res.data.status == 'success') {
          if (res.data.mode == 'teacher') {
            this.$router.push(
              {
                name: "roomcreate",
                query: {
                  userId: res.data.userId
                }
              }
            )
          }
          if (res.data.mode == 'student') {
            this.$router.push(
              {
                name: "roomjoin",
                query: {
                  userId: res.data.userId
                }
              }
            )
          }
        }
      }).catch(err => {
        console.error("Error:", err);
      });
    },
    goRegister() {
      register(this.$data.registerInfo).then(res => {
        console.log(res)
        if (res.data.status == 'success') {
          if (res.data.mode == 'teacher') {
            this.$router.push(
              {
                name: "roomcreate",
                query: {
                  userId: res.data.userId
                }
              }
            )
          }
          if (res.data.mode == 'student') {
            console.log('ahahahahah')
            this.$router.push(
              {
                name: "roomjoin",
                query: {
                  userId: res.data.userId
                }
              }
            )
          }
        }
      }).catch(err => {
        console.error("Error:", err);
      });
    },
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
          margin: 5px auto;
          text-align: center;
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
              outline: none;
            }
          }

          .psdContainer {
            width: 90%;
            position: relative;

            input {
              width: 100%;
              padding: 10px 5%;
              font-size: 16px;
              border-radius: 5px;
              border: #1B5E20 1px solid;

              &:focus {
                outline: none;
              }
            }

            .toggle-icon {
              position: absolute;
              right: -5%;
              top: 50%;
              transform: translateY(-50%);
              cursor: pointer;
              color: #777;
              font-size: 14px;
            }
          }

        }

        .radio {
          margin: 5px auto;

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
            justify-content: space-around;

            .radio-option {
              margin: 0 30px;

              input {
                width: 30px;
                padding: 10px;
                font-size: 16px;
                border-radius: 5px;
                border: #1B5E20 1px solid;

                &:focus {
                  outline: none;
                }
              }
            }

          }

        }

        .btn-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;

          .btn {
            cursor: pointer;
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

        .textBtn-container {
          text-align: right;
          font-size: 14px;
          margin-top: 10px;

          .textBtn {
            color: #1B5E20;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
