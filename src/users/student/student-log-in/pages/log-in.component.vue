<template>
  <div class="logincard div-login-general" >
    <pv-card class="div-login-center" >
      <template v-slot:content>
        <div class="flex">
          <div
              class="
              contentlogincard
            "
          >
            <h1>Login to your account</h1>
            <img
                alt="Getting Better logo"
                class="logo"
                src="@/assets/logo-gb.png"

            />
            <div class="input-login-data" style="width: 90%">
              <div class="col mt-4 mb-2">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                  </span>
                  <span class="p-float-label">
                    <pv-input-text style="width: 100%" v-model="username" />
                    <label for="username">Username</label>
                  </span>
                </div>
              </div>
              <div class="col mt-2 mb-4">
                <div class="p-inputgroup">
                  <span class="p-inputgroup-addon">
                    <i class="pi pi-lock"></i>
                  </span>
                  <span class="p-float-label">
                    <pv-input-text
                        type="password"
                        style="width: 100%"
                        v-model="password"
                    />
                    <label for="password">Password</label>
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <hr style="display: inline-block; width: 140px; opacity: 0.7" />
              <span> or </span>
              <hr style="display: inline-block; width: 140px; opacity: 0.7" />
            </div>
            <div class="social-login mb-3">
              <pv-button
                  v-for="socialLogin in socialLogins"
                  :key="socialLogin.name"
                  :icon="socialLogin.icon"
                  :style="{ backgroundColor: socialLogin.color, border: none }"
                  class="p-button-rounded ml-2"
              />
            </div>
            <div class="flex justify-content-center mt-3">
              <pv-button
                  @click="submitLogin()"
                  style="width: 200px"
                  label="Login"
                  class="p-button-rounded"
              />
            </div>
          </div>
          <div
              class="contentlogincard"
          >
            <div class=title>
              <h1 class="mb-2">New to Getting Better?</h1>
              <p>
                Join the <strong>best</strong> and
                <strong>interactive</strong> platform to learn or teach e-sports!
              </p>
            </div>
            <pv-button
                @click="goToSignUpView()"
                style="width: 200px; color: #000000"
                label="Sign Up"
                class="p-button-rounded"
            />
          </div>
        </div>
      </template>
    </pv-card>

    <div class="layout-footer" >
      <div class="layout-footer-left">
        <span>Created By </span>

      </div>
      <img
          alt="softweb  logo"
          class="logo"
          src="@/assets/softweb.jpg"

      />
      <div class="layout-footer-right">
        <a href="https://github.com/Getting-Better" class="mr-3">
          <i class="pi pi-github"></i>
        </a>
        <a href="https://twitter.com/Softweb" class="mr-3">
          <i class="pi pi-twitter"></i>
        </a>
        <a href="https://discord.com/invite/Softweb">
          <i class="pi pi-discord"></i>
        </a>

      </div>
    </div>
  </div>

</template>

<script>
import StudentsService from '../../../coach/coach-student/services/students.service';

export default {
  name: "student-log-in",
  data() {

    return {
      username: '',
      password: '',
      socialLogins: [
        { name: "google", icon: "pi pi-google", color: "#c52525" },
        { name: "facebook", icon: "pi pi-facebook", color: "#1976f2" },
        { name: "linkedin", icon: "pi pi-linkedin", color: "#0474b4" },
      ],
    };
  },
  created() {},
  methods: {
    submitLogin() {
      StudentsService.confirmCredentials(this.username,this.password).then((response)=>{
        if(response.data.length>0){
          this.$router.push("/student-home")
        }
      })
    },

    goToSignUpView() {
      this.$router.push("student-sign-up");
    },

  },
};
</script>

<style scoped>
.flex{
  align-content: center;

}
.logo{
  max-width: 100px;
  align-content: center;
  margin: auto;
}
.layout-footer{
  style: "font-weight: 300; font-size: 1.4rem";
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #181818;
  color: white;
  text-align: center;

}
:deep(div.p-card-content) {
  padding: 0;
  margin: 0;
}
:deep(div.p-card.p-component) {
  border-radius: 10px;
}
:deep(div.p-card-body) {
  padding: 0;
  margin: 0;
}
:deep(button.p-button.p-button-icon-only.p-button-rounded) {
  border: none;
}
:deep(button.p-button) {
  border: none;
  padding: 12px 0px;
}
.not-logged {
  width: 40%;
  height: 500px;
}
.not-logged .text-container > h1,
.not-logged .text-container > p {
  color: black;
  text-align: center;
}
.div-login-general {
  background: rgb(255, 255, 255);
  height: 590px;


  display: flex;
  justify-content: center;


}

.div-login-center {

  margin-top: 150px;
  width: 400px;
  align-items: center;
  border-style: solid;
  border-width: 7px;
  border-color: rgb(26, 26, 88);
}

.div-login-center img{
  width: 200px;
  margin-left: 90px;
  align-items: center;
  border-style: solid;
  border-width: 3px;
  border-color: rgb(26, 26, 88);
}
.logincard{
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.contentlogincard{
  margin-left:10px;
  margin-top:10px;
  margin-rigth:10px;
  margin-bottom:10px;
  justify-content: center;
  text-align-all: center;

}
.actionslogin{
  margin-left: 150px;
}
.logintitle{

  margin-left: 150px;
}
.loginsubtitle{

  margin-left: 165px;
}



</style>