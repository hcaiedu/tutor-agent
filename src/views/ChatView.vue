<template>
  <div class="background">
    <div class="container">
      <div class="left">
        <div class="chat_room">
          <div class="chat_title">
            Chat
          </div>
          <div ref="messages" class="messages">
            <ChatMessage v-for="(msg, index) in roomInfo.history" :key="index" :message="msg"
              :userId="userInfo.userId" />
          </div>
          <div class="chat_input">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type in message..." />
            <button @click="agentResponse">AI Response</button>
            <button @click="sendMessage">Send</button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="room_container">
          <div class="room_info">
            <div class="room_logo">
              <img src="" alt="">
            </div>
            <div class="room">
              <div class="room_title">
                Room
              </div>
              <div class="room_content">
                {{ this.roomInfo.roomName }} ({{ this.roomInfo.roomId }})
              </div>
            </div>
            <div class="topic">
              <div class="topic_title">
                Discussion Topic
              </div>
              <div class="topic_content">
                {{ this.roomInfo.topic }}
              </div>
            </div>
          </div>
          <div class="member_container">
            <div class="member_title">
              Group Member
            </div>
            <div class="member_list">
              <div class="member_item" v-for="item in roomInfo.roomMember" :key='item'>
                <div :class="item.memberId == this.userInfo.userId ? 'member_avatar_me' : 'member_avatar'">
                  <img :src=item.memberAvatar alt="">
                </div>
                <div :class="item.memberId == this.userInfo.userId ? 'member_name_me' : 'member_name'">
                  {{ item.memberName }}
                  <div v-if="item.memberId == this.userInfo.userId"> (me)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cognitive_container">
          <div class="cognitive_title_container">
            <div class="cognitive_title">
              Emotion Tracing ({{ this.userInfo.userName }})
            </div>
            <button class="collapse_btn" @click="toggleCollapse">
              <font-awesome-icon :icon="isCollapsed ? 'chevron-down' : 'chevron-up'" />
            </button>
          </div>
          <transition name="fade">
            <div class="radar_container" v-show="!isCollapsed">
              <Radar :chartData="radar_chartData" :indicator="radar_indicator" />
              <!-- <div class="radar_description">
                <div class="radar_desc_item" v-for="item in radar_desc" :key="item">
                  <span>{{ item.label }}</span>: <span>{{ item.desc }}</span>
                </div>
              </div> -->
            </div>
          </transition>
        </div>
        <div class="cognitive_container">
          <div class="cognitive_title_container">
            <div class="cognitive_title">
              Progression Trends ({{ this.userInfo.userName }})
            </div>
            <button class="collapse_btn" @click="toggleCollapseTracing">
              <font-awesome-icon :icon="isCollapsedTracing ? 'chevron-down' : 'chevron-up'" />
            </button>
          </div>
          <transition name="fade">
            <div class="tracing_container" v-show="!isCollapsedTracing">
              <LineChart :xData="xAxisData" :seriesData="linesData" :xAxisName="'Time'" :yAxisName="'Value'" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_cognitive, get_user_info, update_cognitive } from '@/api/userApi';
import { get_room_info, update_message, get_agent_message } from '@/api/roomApi';
import ChatMessage from '@/components/ChatMessage.vue';
import Radar from '@/components/Radar.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import LineChart from '@/components/LineChart.vue';
library.add(faChevronDown, faChevronUp);
export default {
  components: { ChatMessage, Radar, FontAwesomeIcon, LineChart },
  data() {
    return {
      userInfo: {},
      roomInfo: {},
      newMessage: "",
      agent_response: {},
      messages: "",
      isCollapsed: false,
      isCollapsedTracing: true,
      radarChart: null,
      radar_desc: [
        { label: 'A', desc: 'Joy' },
        { label: 'B', desc: 'Trust' },
        { label: 'C', desc: 'Fear' },
        { label: 'D', desc: 'Surprise' },
        { label: 'E', desc: 'Anger' },
        { label: 'F', desc: 'Disgust' }
      ],
      radar_indicator: [
        { name: 'Joy', max: 1 },
        { name: 'Trust', max: 1 },
        { name: 'Fear', max: 1 },
        { name: 'Surprise', max: 1 },
        { name: 'Anger', max: 1 },
        { name: 'Disgust', max: 1 }
      ],
      radar_chartData: [
        {
          value: [],
          name: "Cognitive Level",
        }
      ],
      xAxisData: [],
      linesData: [],
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleCollapseTracing() {
      this.isCollapsedTracing = !this.isCollapsedTracing;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messages;
        if (container) {
          container.scrollTop = container.scrollHeight; // 滚动到底部
        }
        // container.scrollTop = container.scrollHeight;
      });
    },
    get_date() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份补零
      const day = date.getDate().toString().padStart(2, '0');          // 日期补零
      const formattedDate = `${year}/${month}/${day}`;
      return formattedDate
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      const message = {
        date: this.get_date(),
        time: new Date().toLocaleTimeString(),
        userId: this.userInfo.userId,
        userName: this.userInfo.userName,
        userAvatar: this.userInfo.userAvatar,
        response: this.newMessage,
        "received_information": this.agent_response["received_information"],
        "response": this.newMessage,
        "self-regulation": this.agent_response["self-regulation"],
        "reason for self-regulation": this.agent_response["reason for self-regulation"],
        "co-regulation": this.agent_response["co-regulation"],
        "reason for co-regulation": this.agent_response["reason for co-regulation"],
        "student_response_raw": this.agent_response["student_response_raw"],
      };
      this.$socket.emit('send_message', { userName: this.userInfo.userName, message: message, roomId: this.roomInfo["_id"] });
      this.newMessage = '';
      update_cognitive(this.userInfo.userId).then(res => {
        this.radar_chartData = [
          {
            value: res.data.cognitive_level,
            name: "Cognitive Level",
          },
        ];
        this.xAxisData = res.data.tracingX;
        this.linesData = res.data.tracingY;
      }).catch(err => {
        console.error("Error:", err);
      });
    },
    joinRoom() {
      const params = {
        roomId: this.$route.query.roomId,
        userName: this.$route.query.userName
      }
      this.$socket.emit("join", params);
    },
    agentResponse() {
      const params = {
        "user_id": this.userInfo.userId,
        "room_id": this.roomInfo._id
      }
      get_agent_message(params).then(res => {
        // this.userInfo = res.data;
        this.agent_response = res.data;
        this.newMessage = res.data.message;
      }).catch(err => {
        console.error("Error:", err);
      });
    }
  },
  watch: {
    messages() {
      this.scrollToBottom();
    }
  },
  created() {
    get_user_info(this.$route.query.userId).then(res => {
      // this.userInfo = res.data;
      this.userInfo = res.data;
    }).catch(err => {
      console.error("Error:", err);
    });
    get_cognitive(this.$route.query.userId).then(res => {
      this.radar_chartData = [
        {
          value: res.data.cognitive_level,
          name: "Cognitive Level",
        },
      ];
      this.xAxisData = res.data.tracingX;
      this.linesData = res.data.tracingY;
    }).catch(err => {
      console.error("Error:", err);
    });
    get_room_info(this.$route.query.roomId).then(res => {
      this.roomInfo = res.data;
    }).catch(err => {
      console.error("Error:", err);
    });
  },
  mounted() {
    this.scrollToBottom();
    this.$socket.on('receive_message', (message) => {
      this.roomInfo.history.push(message);
      this.scrollToBottom();
    });
    this.joinRoom();
  },
  updated() {
    // 只有用户在底部时才滚动
    // this.scrollToBottomIfNeeded();
  },
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

  // justify-content: center;
  // align-items: center;
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right {
      margin-right: 1%;
      width: 640px;
      height: 98vh;
      overflow-y: auto;

      .room_container {
        background: white;
        border-radius: 25px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .room {
          margin-bottom: 20px;

          .room_title {
            font-size: 20px;
            font-weight: 600;
            margin-left: 20px;
            margin-right: 20px;
            padding-bottom: 10px;
            margin-bottom: 15px;
            color: #1b5e1f;
            // border-bottom: 1px solid #cccccc;
          }

          .room_content {
            // margin-top: 5px;
            font-size: 16px;
            font-weight: 600;
            margin-left: 20px;
          }
        }

        .topic {
          margin-bottom: 10px;

          .topic_title {
            font-size: 20px;
            font-weight: 600;
            margin-left: 20px;
            margin-right: 20px;
            padding-bottom: 10px;
            color: #1B5E20;
            // border-bottom: 1px solid #cccccc;
          }

          .topic_content {
            // width: 360px;
            height: 60px;
            margin-top: 15px;
            font-size: 16px;
            margin-left: 20px;
            margin-right: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 10px 15px;
            background: #f5f5f5;
            text-align: justify;
          }
        }

        .member_container {
          .member_title {
            margin-top: 20px;
            font-size: 20px;
            font-weight: 600;
            margin-left: 20px;
            margin-right: 20px;
            color: #1B5E20;
            padding-bottom: 10px;
            // border-bottom: 1px solid #cccccc;
          }

          .member_list {
            margin: 0 auto;
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .member_item {
              margin-left: 20px;
              margin-top: 10px;
              margin-bottom: 10px;

              .member_avatar_me {
                width: 50px;
                height: 50px;

                img {
                  width: 100%;
                  height: 100%;
                  border: 2px dotted #1b5e1f;
                  border-radius: 50%;
                }
              }

              .member_avatar {
                width: 50px;
                height: 50px;

                img {
                  width: 100%;
                  height: 100%;
                  border: 2px dotted #a1a1a1;
                  border-radius: 50%;
                }
              }

              .member_name_me {
                margin-top: 5px;
                text-align: center;
                font-size: 14px;
                color: #1b5e1f;
              }

              .member_name {
                margin-top: 5px;
                text-align: center;
                font-size: 14px;
              }
            }
          }

        }
      }

      .cognitive_container {
        width: 100%;
        // height: 400px;
        align-self: flex-end;
        margin: 20px auto 20px auto;
        background: white;
        border-radius: 25px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .cognitive_title_container {
          display: flex;
          padding-top: 20px;
          margin-left: 20px;
          margin-right: 20px;
          margin-bottom: 20px;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dotted #ccc;

          .cognitive_title {
            font-size: 20px;
            font-weight: 600;
            color: #1B5E20;
            height: 30px;
            line-height: 30px;
            padding-bottom: 10px;
          }

          .collapse_btn {
            background-color: transparent;
            /* 透明背景 */
            border: none;
            /* 无边框 */
            cursor: pointer;
            /* 鼠标手势 */
            font-size: 20px;
            /* 图标大小 */
            padding: 5px;
            /* 按钮内边距 */
            color: #1B5E20;
            /* 默认颜色 */
            transition: color 0.3s;
            /* 平滑颜色变化 */
            // margin-right: 10px;
          }
        }

        .radar_container {
          .radar_description {
            display: flex;
            flex-wrap: wrap;
            font-size: 14px;
            margin-left: 20px;
            padding-bottom: 20px;
            color: #7b7a7a;

            .radar_desc_item {
              padding: 3px 5px;
            }
          }
        }
      }
    }

    .left {
      margin-right: 1%;
      margin-left: 1%;
      background: white;
      border-radius: 25px;
      flex: 1;
      height: 98vh;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .chat_room {
        // margin-top:20px;
        display: flex;
        flex-direction: column;
        height: 92vh;

        .chat_title {
          font-size: 20px;
          font-weight: 600;
          margin-top: 20px;
          // margin-left: 20px;
          // margin-bottom: 20px;
          color: #1B5E20;
          text-align: center;
          height: 30px;
        }

        .messages {
          margin: 0 auto;
          width: 90%;
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          background: #f2f2f2;
          border-top: 1px solid #eceaea;
          border-bottom: 1px solid #eceaea;
        }
      }

      .chat_input {
        margin: 20px auto 0 auto;
        width: 90%;
        display: flex;
        padding: 10px;
        /* border-top: 1px solid #ccc; */
        background: #fff;
        height: 46px;

        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }

        button {
          margin-left: 10px;
          padding: 10px 20px;
          background-color: #1b5e1f;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
      }
    }
  }
}

// .fade-enter-active, .fade-leave-active {
//   transition: opacity 0.1s;
// }
// .fade-enter, .fade-leave-to {
//   opacity: 0;
// }</style>