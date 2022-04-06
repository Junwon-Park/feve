<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full md:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-2"
        >
          <div class="flex-auto px-4 lg:px-10 py-10 pt-10">
            <div class="text-2xl text-blueGray-800 text-center mb-5 font-bold">
              비밀번호 변경
            </div>
            <form>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-800 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  아이디
                </label>
                <input
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="아이디를 입력하세요."
                  v-model="inputId"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-800 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  이메일
                </label>
                <input
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="아이디를 입력하세요."
                  v-model="inputMail"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-800 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  변경할 비밀번호
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="변경할 비밀번호를 입력하세요."
                  v-model="inputNewPassword"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-800 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  변경할 비밀번호 확인
                </label>
                <input
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="비밀번호를 다시 한 번 입력하세요."
                  v-model="inputCheckNew"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="form-checkbox border-1 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-orange-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                  @click="submitChange"
                >
                  변경하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inputId: '',
      inputMail: '',
      inputNewPassword: '',
      inputCheckNew: ''
    };
  },
  methods: {
    async submitChange() {
      const changResult = await this.$axios
        .post(
          `${this.$store.getters.ServerUrl}/auth/findpassword`,
          {
            USER_ID: this.inputId,
            USER_MAIL: this.inputMail,
            inputNewPassword: this.inputNewPassword
          },
          {
            withCredentials: true
          }
        )
        .catch((err) => {
          console.error('Change Password is failed!!!', err);
          alert('비밀번호 번경에 실패했습니다.');
          return location.reload();
        });
      if (changResult.data.data) {
        alert('비밀번호 번경이 완료되었습니다.');
        return (location.href = `${this.$store.getters.LocalUrl}/auth/login`);
      }
    }
  }
};
</script>
