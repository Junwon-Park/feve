<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2"
          large
          fab
          color="rgb(239, 68, 68)"
          v-bind="attrs"
          v-on="on"
          style="position: fixed; bottom: 40px; right: 40px; z-index: 100"
        >
          <v-icon color="white">mdi-chat</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">문의하기</span>
        </v-card-title>
        <hr />
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                v-for="(chat, i) in chat.mine"
                :key="i"
              >
                <v-chip> {{ chat.message }} </v-chip>
                <v-chip class="ma-2" x-small> 1:00 pm </v-chip>
              </v-col>

              <v-col
                cols="12"
                sm="12"
                md="12"
                class="text-right"
                v-for="(chat, i) in chat.others"
                :key="i"
              >
                <v-chip class="ma-2" x-small color="orange" text-color="white">
                  1:02 pm
                </v-chip>
                <v-chip color="orange" text-color="white">
                  {{ chat.message }}
                </v-chip>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="내용을 입력해주세요."
                  style="width: 90%; outline: none; border-color: #ccc"
                  v-model="inputMessage"
                />
                <v-btn small color="orange" dark @click="sendMessage">
                  전송
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <hr />
          <small class="mt-10"
            >* 상담내용은 따로 저장되지 않으니 주의하시기 바랍니다.</small
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false"> 취소 </v-btn>
          <v-btn color="orange darken-1" text @click="dialog = false">
            상담 완료
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  created() {
    this.$socket.on('chat', (msg) => {
      this.chat.mine.push({ message: msg });
    });
  },
  data: () => ({
    dialog: false,
    inputMessage: '',
    chat: {
      mine: [{ message: 'hi~' }],
      others: [{ message: 'oh! hi~~' }]
    }
  }),
  methods: {
    sendMessage() {
      console.log('click??');
      this.$socket.emit('chat', { message: this.inputMessage });
      this.chat.mine.push({ message: this.inputMessage });
    }
  }
};
</script>
