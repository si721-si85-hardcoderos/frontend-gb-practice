<template>
  <div class="flex justify-content-center">
    <pv-card style="width: 600px; height: 590px">
      <template v-slot:title>
        <div style="text-align: center; margin-bottom: 20px; margin-top: 20px">
          <h3>Sign Up</h3>
          <p style="font-weight: 300; font-size: 1.4rem">
            Ready to join the best community?
          </p>
        </div>
      </template>
      <template v-slot:content>
        <div>
          <div
              class="input-data-sign-up flex flex-column align-items-center gap-5"
          >
            <div class="flex justify-content-center gap-2">
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
                  v-model="value"
              />
              <label for="email">Email</label>
            </span>
            <span class="p-float-label">
              <pv-input-text
                  class="input-general"
                  id="email"
                  type="password"
                  v-model="email"
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
  </div>
</template>

<script>
import  CoachesService  from '../../coach/services/coaches.service';
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
.input-name {
  width: 225px;
}
.input-general {
  width: 458px;
}
:deep(button.p-button.p-component.p-button-rounded) {
  border: none;
  width: 190px;
  padding: 12px 0;
}
:deep(a) {
  display: inline-block;
}
</style>