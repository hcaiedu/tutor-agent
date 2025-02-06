<template>
  <div class="background">
    <div class="container">
      <div class="left">
        <div class="title">
          The Education University of Hong Kong Learning System
        </div>
        <div class="subtitle">
          Collaborative learning
        </div>
        <div class="btn_container">
          <div class="btn" @click="createRoom">
            Create Room
          </div>
          <div class="btn" @click="joinRoom">
            Join Room
          </div>
        </div>
      </div>
      <div class="right">
        <div class="logo">
          <img src="../assets/logo.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      createRoom() {
        this.$router.push('/roomcreate')
      },
      joinRoom() {
        this.$router.push('/roomjoin')
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
      background: #C8E6C9;
      width: 80%;
      max-width: 1200px;
      display: flex;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
      .left {
        width: 50%;
        padding: 20px;
        .title {
          margin: 0 0 10px;
          color: #1B5E20;
          font-size: 38px;
          text-align: center;
          font-weight: 900;
        }
        .subtitle {
          color: #1B5E20;
          font-size: 20px;
          text-align: center;
          font-weight: 300;
        }
        .btn_container {
          display: flex;
          margin-top: 20px;
          align-items: center;
          justify-content: center;
          .btn {
            border-radius: 50%;
            background: #A5D6A7;
            cursor: pointer;
            font-weight: bold;
            color: #1B5E20;
            padding: 10px 20px;
            margin: 10px;
          }
        }
      }
      .right {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .logo {
          width: 80%;
          margin: 0 auto;
          height: auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
