<template>
  <div class="hello">
    hello~ 
    <button v-on:click="abc()"> 클릭 </button> 
    <p>123123 </p>

    <p> {{ msg }} </p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  methods : {
    abc : function() {
      this.$http.post('/api/test').then(response => {
        this.msg = response.data
      })

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
