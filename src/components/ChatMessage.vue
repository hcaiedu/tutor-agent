<template>
  <div :class=
    "{
      'message_agent': message.userId === 'u000',
      'message_me': message.userId != 'u000' && message.userId == userId,
      'message': message.userId != 'u000' && message.userId != userId,
    }"
  >
    <div class="user">
      <div class="user_avatar">
        <img :src=message.userAvatar alt="">
      </div>
      <div class="user_name">
        {{ message.userName }}
      </div>
    </div>
    <div class="msg_content">
      {{ message.text }}
    </div>
    <div class="msg_time">
      {{ message.time }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
    userId: String
  },
};
</script>

<style lang="scss" scoped>
.message_agent {
  margin: 10px;
  padding: 10px;
  // background: #fff;
  // border: 1px solid #ddd;
  // border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // width: 100%;
  .user {
    display: flex;
    align-items: center;
    .user_avatar {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px dotted #DF6D38;
      }
    }
    .user_name {
      margin-left: 10px;
    }
  }
  .msg_content {
      background: #f6824c;
      border-radius: 10px;
      padding: 15px 20px;
      margin: 10px;
      width: 60%;
      text-align: justify;
      // border: 1px solid #1B5E20;
  }
  .msg_time {
    margin-left: 10px;
    font-size: 0.8em;
    color: #999;
  }
}
.message_me {
  margin: 10px;
  padding: 10px;
  // background: #fff;
  // border: 1px solid #ddd;
  // border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // width: 100%;
  .user {
    display: flex;
    align-items: center;
    .user_avatar {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px dotted #1b5e1f;
      }
    }
    .user_name {
      margin-left: 10px;
    }
  }
  .msg_content {
      background: #33b233;
      border-radius: 10px;
      padding: 15px 20px;
      margin: 10px;
      width: 60%;
      text-align: justify;
      // border: 1px solid #1B5E20;
  }
  .msg_time {
    margin-left: 10px;
    font-size: 0.8em;
    color: #999;
  }
}
.message {
  margin: 10px;
  padding: 10px;
  // background: #fff;
  // border: 1px solid #ddd;
  // border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // width: 100%;
  .user {
    display: flex;
    align-items: center;
    .user_avatar {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px dotted #ccc;
      }
    }
    .user_name {
      margin-left: 10px;
    }
  }
  .msg_content {
    background: #ffffff;
    border-radius: 10px;
    padding: 15px 20px;
    margin: 10px;
    width: 60%;
    text-align: justify;
    // border: 1px solid #1B5E20;
  }
  .msg_time {
    margin-left: 10px;
    font-size: 0.8em;
    color: #999;
  }
}
</style>