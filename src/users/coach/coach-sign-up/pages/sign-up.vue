<template>
  <div class="div-register1 ">
    <pv-card class="formregister">
      <template v-slot:title>
        <div style="text-align: center; margin-bottom: 20px; margin-top: 20px">
          <h3>Sign Up</h3>

          <img
              alt="Getting Better logo"
              class="logo"
              src="@/assets/logo-gb.png"

          />

          <p style="font-weight: 300; font-size: 1.4rem">
            Ready to join the best community?
          </p>
        </div>
      </template>
      <template v-slot:content>
        <div class="div-register2">
          <div
              class="input-data-sign-up flex flex-column align-items-center gap-5"
          >
            <div class="flex justify-content-center gap-5">
              <span class="p-float-label">
                <pv-input-text
                    id="firstname"
                    class="input-name"
                    v-model="firstName"
                />
                <label for="firstname">First Name</label>
              </span>
              <span class="p-float-label">
                <pv-input-text
                    class="input-name"
                    id="lastname"
                    type="text"
                    v-model="lastName"
                />
                <label for="lastname">Last Name</label>
              </span>
              <span class="p-float-label">
                <pv-input-text
                    class="input-name"
                    id="nickname"
                    type="text"
                    v-model="nickname"
                />
                <label for="lastname">Nickname</label>
              </span>
            </div>
            <span class="p-float-label">
              <pv-input-text
                  class="input-general"
                  id="email"
                  type="email"
                  v-model="email"
              />
              <label for="email">Email</label>
            </span>
            <span class="p-float-label">
              <pv-input-text
                  class="input-general"
                  id="email"
                  type="password"
                  v-model="password"
              />
              <label for="password">Password</label>
            </span>
            <span class="p-float-label">
              <pv-input-text
                  class="input-general"
                  id="confirm-password"
                  type="password"
                  v-model="confirmPassword"
              />
              <label for="confirm-password">Confirm Password</label>
            </span>
          </div>
        </div>
        <div
            class="flex flex-column justify-content-center align-items-center mt-5 mb-5"
        >
          <p class="mb-3">
            <span>Already have an account? </span>
            <router-link style="display: inline-block" to="/log-in"
            >Login here.</router-link
            >
          </p>
          <pv-button @click="submitSignUp()" label="Sign Up" class="p-button-rounded burning-orange" />
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
import  CoachesService  from '../../services/coaches.service';
export default {
  data() {
    return {
      user: {
      },
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    };
  },
  methods: {
    submitSignUp(){
      CoachesService.getByUsername(this.nickname).then((response)=>{
        console.log(response.data);
        if(response.data==0){
          this.user.id=0;
          this.user.firstName=this.firstName;
          this.user.lastName=this.lastName;
          this.user.email=this.email;
          this.user.password=this.password;
          this.user.nickname=this.nickname;
          CoachesService.create(this.user).then((response)=>{
            this.$router.push("/home");
          })
        }
      })
      CoachesService.create()
    }
  }
};
</script>

<style scoped>
.p-float-label{
  margin-left:10px;
  margin-top:10px;
  margin-rigth:10px;
  margin-bottom:10px;
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
.input-name {
  max-width: 225px;
  margin-left:10px;

  margin-rigth:10px;

}
.input-general {
  max-width: 225px;
  margin-left:10px;

  margin-rigth:10px;

}
:deep(button.p-button.p-component.p-button-rounded) {
  border: none;
  width: 190px;
  padding: 12px 0;
}
:deep(a) {
  display: inline-block;
}
.formregister{
  margin-top: 150px;
  width: 400px;
  align-items: center;
  border-style: solid;
  border-width: 7px;
  border-color: rgb(26, 26, 88);
  margin-bottom:150px;

}
.div-register1{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-left:10px;
  margin-top:10px;
  margin-rigth:10px;
  margin-bottom:10px;

}

.div-register2 {

  width: auto;
  align-items: center;
  border-style: solid;
  border-width: 5px;
  border-color: #24303c;

  margin-left:10px;
  margin-top:10px;
  margin-rigth:10px;
  margin-bottom:10px;

}

.headercardregister{
  align-items: center;
  margin-left: 80px;
}
.matconten{
  width: 100%;
}
.actionsregister{
  align-items: center;
  margin-left: 100px;
}



.formregister{
  width: 500px;
}


</style>