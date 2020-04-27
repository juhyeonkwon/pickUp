<template>
<div class='signup'>

    email <input type="text" id='email' v-model="email">
    password <input type="text" id='password' v-model="password">
    nick_name <input type="text" id='nick_name' v-model="nick_name">

    <button id='button' v-on:click="submit">제출</button>

</div>
    
</template>


<script>
export default {
    data(){
      return {
        email : '',
        password : '',
        nick_name : '',
      }
    },
    methods : {
        submit : function() {
           this.$http.post('/api/signup', {email : this.email, password : this.password, nick_name : this.nick_name}).then(response => {
               console.log(response.data.affectedRows);

               if(response.data.affectedRows) {
                   alert('회원가입에 성공했습니다.');
               }
           });

        },

    }
    
}
</script>


<style>

</style>