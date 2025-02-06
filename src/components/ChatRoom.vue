<template>
  
</template>

<script>


export default {
  components: { ChatMessage },
  props: {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timer: null,
      messages: []
    };
  },
  methods: {
    // 加载存储的消息
    loadMessages() {
      get_room_info(this.$route.query.roomId).then(res => {
        this.messages = res.data.history;
      }).catch(err => {
        console.error("Error:", err);
      });
    },    
  },
  mounted() {
    this.loadMessages();
    this.timer = setInterval(() => {
      this.loadMessages()
    }, 10000);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>


</style>